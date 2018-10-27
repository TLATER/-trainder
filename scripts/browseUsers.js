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
    userTemplate: document.querySelector('.userTemplate'),
    container: document.querySelector('.main'),
    userList: document.querySelector(".userList")
  };


	app.displayUser = function(data) {
		console.log("Setting name " + data.name);
		var user = app.userTemplate.cloneNode(true);
		user.classList.remove('userTemplate');
		user.removeAttribute('hidden');
		user.querySelector('.name').textContent = data.name;
		app.userList.appendChild(user);
		console.log("appended " + user);
	}

	var user1 = {
		name: "Brucie"
	}
	var user2 = {
		name: "Gazzo"
	}
	
	app.displayUser(user1);
	app.displayUser(user2);
}


)();
