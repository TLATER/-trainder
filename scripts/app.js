// Copyright 2016 Google Inc.
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
      username: "Loz\'n",
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

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  app.sendMessage = function(data) {
    if (data.messageText != "") {
      var message = app.messageTemplate.cloneNode(true);
      message.classList.remove('messageTemplate');
      message.removeAttribute('hidden');
      message.querySelector('.username').textContent = data.username;
      message.querySelector('.messageText').textContent = data.messageText;
      app.chat.appendChild(message);
      }
  }

  // Display the message received
  app.displayMessage = function(data) {
    var message = app.messageTemplate.cloneNode(true);
    message.classList.remove('messageTemplate');
    message.removeAttribute('hidden');

    if (data.content.msgtype == "m.text") {
      message.querySelector('.username').textContent = data.sender;
      message.querySelector('.messageText').textContent = data.content.body;
      app.chat.appendChild(message);
    } else if (data.content.msgtype == "m.image") {
      // Deal with this like an image
      message.querySelector('.username').textContent = data.sender;
      //message.querySelector('.messageText').textContent = data.content.body;
      app.chat.appendChild(message);
    } else {
      console.log("Don't know how to display data type " + data.content.msgtype);
    }
  }


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  var message1 = {
    username: 'Marie',
    messageText: 'Why are pirates called pirates?'
  };

  var message2 = {
    username: 'Sharie',
    messageText: 'Because THEY ARRRRRRR'
  };

  app.sendMessage(message1);
  app.sendMessage(message2);
}

)();

function pollForMessages(){
  $.post('ajax/test.html', function(data) {
    // If new message, send it
    displayMessage(data);
    setTimeout(pollForMessages,5000);
  });
}