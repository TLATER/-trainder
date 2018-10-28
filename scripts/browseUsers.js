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

var id = 1;

(function() {
  'use strict';

  var app = {
    userTemplate: document.querySelector('.userTemplate'),
    container: document.querySelector('.main'),
		userList: document.querySelector(".userList"),
		chat: document.querySelector(".chat"),
		inputBox: document.querySelector(".inputBox")
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

	app.displayUser = function(data) {
		var user = app.userTemplate.cloneNode(true);
		user.classList.remove('userTemplate');
		user.removeAttribute('hidden');
		user.querySelector('.id').textContent = id++;
		user.querySelector('.username').textContent = data.username;
		user.addEventListener("click", function() {
			console.log("Clicked a user");
			var userID = this.querySelector("id");
			console.log("Requesting to talk to user " + userID);
	
			// Display the chat window for this user
			app.userList.style.display = "none";	// remove users
			app.chat.style.display = "block";			// show chat
			app.inputBox.style.display = "flex"; // show input
	
		});
		app.userList.appendChild(user);
	}

	//Todo: Get users based on the train
	const urlParams = new URLSearchParams(window.location.search);
	console.log("Todo: Get the users on train " + urlParams.get("train"));
	var user1 = {
		username: "Brucie"
	}
	var user2 = {
		username: "Gazzo"
	}
	
	app.displayUser(user1);
	app.displayUser(user2);
}


)();
