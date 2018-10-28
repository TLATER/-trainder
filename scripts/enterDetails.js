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

  document.getElementById('btnEnterDetails').addEventListener('click', function() {
		var from = document.getElementById("inputFrom").value;
		var to = document.getElementById("inputTo").value;
    if (from != "" && to != "") {
			var train = getTrain(from, to); //todo: add the time
			window.open("browseUsers.html?train=" + train, "_self");
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
