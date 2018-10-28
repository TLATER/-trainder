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
    inputForm: document.querySelector('.inputForm'),
    userList: document.querySelector('.userList'),
    chat: document.querySelector(".chat")
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('btnEnterDetails').addEventListener('click', function() {
		var from = document.getElementById("inputFrom").value;
		var to = document.getElementById("inputTo").value;
    if (from != "" && to != "") {
      var train = getTrain(from, to); //todo: add the time
      
      // Details are given, load the next page here
			app.inputForm.style.display = "none";	// remove first form
      app.userList.style.display = "block"; // show online users
      app.userList.trainID = train; // Pass the train ID through

    } else {
			console.log("Please enter valid from and to locations.")
		}
	});

	function getTrain(from, to) {
		var time = new Date()
		time.getTime();

		//Todo: use API to find which train you're on
		return 1;
	}
}


)();
