/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var loged = false;
var user = 'regaby@gmail.com';
var pass = 'test';
const URL =  'https://empleados.polyfilm.com.ar/attendace';

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

   console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
   //document.getElementById('deviceready').classList.add('ready');
   user = localStorage.getItem("user");
   pass = localStorage.getItem("pass");
   //$('#user').val('regaby@gmail.com');
   //$('#password').val('test');

   if (user){
      $('#login').hide();
      $('#attendance').show();
   } else{
      $('#login').show();
      $('#attendance').hide();

   }
   document.getElementById("loginbtn").addEventListener("click", sendloginAtt);   
   document.getElementById("sendAtt").addEventListener("click", sendAtt);   
   document.getElementById("logout").addEventListener("click", logOut);   

   
}


function sendloginAtt(){
   var options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,      
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      user = $('#user').val();
      pass = $('#password').val();
      $.post( URL, {user: user, pass: pass, lat: position.coords.latitude , lon: position.coords.longitude})
      .done(function( data ) {

         $('#login').hide();
         $('#attendance').show();

         alert(data);
          localStorage.setItem("user", user);
          localStorage.setItem("pass",pass);


     }).fail(function(xhr, status, error) {
        alert(status);
        alert(error);
    });
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n')
   }

}

function sendAtt(){
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess2, onError2, options);

   function onSuccess2(position) {
      $.post( URL, {user: user, pass: pass, lat: position.coords.latitude , lon: position.coords.longitude})
      .done(function( data ) {
         alert(data);

     }).fail(function(xhr, status, error) {
        $('#login').show();
        $('#attendance').hide();
    });
   };

   function onError2(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n')
   }

}

function logOut(){
     localStorage.clear();
     $('#login').show();
     $('#attendance').hide();
}

