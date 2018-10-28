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

var id = 1;

(function() {
  'use strict';

  var app = {
    userTemplate: document.querySelector('.userTemplate'),
    container: document.querySelector('.main'),
		userList: document.querySelector(".userList"),
		chat: document.querySelector(".chat"),
		chatHeader: document.querySelector(".chatHeader"),
		userID: document.querySelector(".userID"),
		inputBox: document.querySelector(".inputBox"),
    roomId: null,
    lastMessage: null
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

	app.userList.displayUser = function(name, phone) {
		$("#btnBackToUsers").click(function() {
			app.chat.style.display = "none";	// remove chat
			app.userList.style.display = "block";			// show users
   });
		var user = app.userTemplate.cloneNode(true);
		user.classList.remove('userTemplate');
		user.removeAttribute('hidden');
		user.querySelector('.id').textContent = phone;
		user.querySelector('.username').textContent = name;
		user.addEventListener("click", function() {
			console.log("Clicked a user");
			var userID = user.querySelector(".id").textContent;
			console.log("Requesting to talk to user ID " + userID);

			// Display the chat window for this user
			app.userList.style.display = "none";	// remove users
			app.chat.style.display = "block";			// show chat
			// Todo: Pass through a useful user identification so we
			// know which chat to open
			console.log("Requesting to chat with "
									+ user.querySelector(".username").textContent);
			app.chatHeader.textContent = user.querySelector(".username").textContent;
			app.userID.textContent = userID;	// Know which user talking to
			app.inputBox.style.display = "flex"; // show input

      $.ajax({
        url: `${SERVER}rooms/invite/${userID}/${document._userData.phone}`,
        method: "PUT"
      }).then(data => {
        if (data.hasOwnProperty("error"))
          console.error(data.error);
        else {
          document.roomId = data.room_id;
        }
      });

		});
		app.userList.appendChild(user);
	}

	//Todo: Get users based on the train
	const urlParams = new URLSearchParams(window.location.search);
	console.log("Todo: Get the users on train " + urlParams.get("train"));
	var user1 = {
		username: "Brucie"
	};
	var user2 = {
		username: "Gazzo"
	};
}


)();
