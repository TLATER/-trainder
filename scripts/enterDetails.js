// Copyright 2016 Google Inc.  -*- tab-width: 2; js-indent-level: 2; -*-
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


const SERVER = "http://127.0.0.1:5000/";

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
    var name = document.getElementById("inputName").value;
    var phone = document.getElementById("inputPhone").value;
		var from = document.getElementById("inputFrom").value;
		var to = document.getElementById("inputTo").value;

    if ([name, phone, from, to].some(e => e == "")) {
      console.log("Invalid input");
      return;
    }

    var train = getTrain(from, to); //todo: add the time

    document._userData = {
      name: name,
      phone: phone,
      train: train
    };

    $.get({
      url: `${SERVER}users/register/${name}/${phone}/${train}`,
      dataType: "json"
    }).then(data => {
      if (data.hasOwnProperty("error"))
        console.error(data["error"]);
    });

    $.get({
      url: `${SERVER}users/by_train/${train}`,
      dataType: "json"
    }).then(
      data => {
        if (data.hasOwnProperty("error")) {
          console.error(data["error"]);
        } else {
          // Details are given, load the next page here
          console.info(`Received user list for train ${train}`);
          console.info(data);

          app.inputForm.style.display = "none"; // remove first form
          app.userList.style.display = "block"; // show online users

          // Pass on our user data
          for (let user of data.users) {
            app.userList.displayUser(user[0], user[1]);
          }
        }
      }
    );
  });

	function getTrain(from, to) {
		var time = new Date();
		time.getTime();

		//Todo: use API to find which train you're on
		return 1;
	}


}


)();
