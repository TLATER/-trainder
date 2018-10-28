// Copyright 2016 Google Inc.   -*- tab-width: 2; js-indent-level: 2; -*-
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

document.roomId = null;
document.lastMessage = null;

(function() {
  'use strict';

  var app = {
    visibleCards: {},
    selectedCities: [],
    cardTemplate: document.querySelector('.cardTemplate'),
    messageTemplate: document.querySelector('.messageTemplate'),
    container: document.querySelector('.main'),
    chat: document.querySelector(".chat"),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('btnSendMessage').addEventListener('click', function() {
    var typedMessage = document.getElementById('inputMessage').value;
    var messageJSON = {
      username: "Me",
      messageText: typedMessage
    };

    app.sendMessage(messageJSON);

    document.getElementById('inputMessage').value = "";

  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  app.sendMessage = function(data) {
    if (data.messageText != "") {
      var message = app.messageTemplate.cloneNode(true);
      message.classList.remove('messageTemplate');
      message.removeAttribute('hidden');
      message.querySelector('.username').textContent = data.username;
      message.querySelector('.messageText').textContent = data.messageText;
      app.chat.appendChild(message);

      $.ajax({
        url: `${SERVER}rooms/${document.roomId}/send/m.text/${document._userData.phone}`,
        method: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: `{"body": "${data.messageText}"}`
      }).then(data => {
        if (data.hasOwnProperty("error")) {
          console.error(data.error);
        } else {
          console.info(data);
        }
      });
      }
  };

  function parseContent(content) {
    return JSON.parse(content.replace(/'/g, '"'));
  }

  // Display the message received
  app.displayMessage = function(data) {
    var message = app.messageTemplate.cloneNode(true);
    message.classList.remove('messageTemplate');
    message.removeAttribute('hidden');

    document.lastMessage = data.id;

    if (data.kind == "m.text") {
      message.querySelector('.username').textContent = data.sender;
      message.querySelector('.messageText').textContent = parseContent(data.content).body;
      app.chat.appendChild(message);
    } else if (data.kind == "m.image") {
      // Deal with this like an image
      //Todo: Only allow this to send when it's been 5 days
      message.querySelector('.username').textContent = data.sender;
      //message.querySelector('.messageText').textContent = data.content.body;
      app.chat.appendChild(message);
    } else {
      console.log("Don't know how to display data type " + data.kind);
    }
  };


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  function pollForMessages(){
    if (document.roomId === null) {
      setTimeout(pollForMessages, 500);
      return;
    }

    let last = document.lastMessage || 0;

    $.get({
      url: `${SERVER}rooms/${document.roomId}/sync/${last}`,
      dataType: "json"
    }).then(data => {
      if (data.hasOwnProperty("error")) {
        console.error(data.error);
      } else {
        if (data.events.length > 0) {
          console.info("Received new messages.");
          console.info(data);
        }

        for (let event of data.events)
          app.displayMessage(event);

        setTimeout(pollForMessages, 500);
      }
    });
  }

  pollForMessages();
}

)();
