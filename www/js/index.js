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
var user = 'test';
var pass = 'test';
var employee_name = 'Test';
var attendance_datetime = 'Test';
var attendance_state = 'Test';
var attendance = 'Test';
const URL_LOGIN =  'https://empleados.polyfilm.com.ar/login';
const URL =  'https://empleados.polyfilm.com.ar/attendace';
// const URL_LOGIN =  'http://186.64.120.136:98/login';
// const URL =  'http://186.64.120.136:98/attendace';

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

   console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
   //document.getElementById('deviceready').classList.add('ready');
   user = localStorage.getItem("user");
   pass = localStorage.getItem("pass");
   uid = localStorage.getItem("uid");
   employee_name = localStorage.getItem("employee_name");
   attendance_datetime = localStorage.getItem("attendance_datetime");
   attendance_state = localStorage.getItem("attendance_state");
   attendance = localStorage.getItem("attendance");


   //$('#user').val('regaby@gmail.com');
   //$('#password').val('test');

   if (uid){
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
      //$.post( URL_LOGIN, {user: user, pass: pass, lat: position.coords.latitude , lon: position.coords.longitude})
      $.post( URL_LOGIN, {user: user, pass: pass})
      .done(function( data ) {

         // $('#login').hide();
         // $('#attendance').show();
         // if not data:
         //    alert("Usuario/Contraseña incorrecto");
         // else:
         var obj = JSON.parse(data);
         if (obj['uid'] != false){
            localStorage.setItem("user", user);
            localStorage.setItem("pass",pass);
            localStorage.setItem("uid",obj['uid']);
            // datas {'uid': 879, 'attendance_state': 'S', 'attendance_datetime': '19/01/2021 15:06:07', 'employee_name': 'ABUIN IVAN LEONEL'}
            localStorage.setItem("employee_name", obj['employee_name']);
            localStorage.setItem("attendance_datetime", obj['attendance_datetime']);
            localStorage.setItem("attendance_state", obj['attendance_state']);
            localStorage.setItem("attendance", obj['attendance']);
            $('#employee_name').html(obj['employee_name']);
            $('#attendance_msg').html(obj['attendance']);
            //alert(obj['uid']);
            $('#login').hide();
            $('#attendance').show();
         } else {
            alert("Usuario/Contraseña incorrecto");
         }
          // localStorage.setItem("user", user);
          // localStorage.setItem("pass",pass);


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
         var obj = JSON.parse(data);
         if (obj['uid'] != false){
            localStorage.setItem("user", user);
            localStorage.setItem("pass",pass);
            localStorage.setItem("uid",obj['uid']);
            localStorage.setItem("employee_name", obj['employee_name']);
            localStorage.setItem("attendance_datetime", obj['attendance_datetime']);
            localStorage.setItem("attendance_state", obj['attendance_state']);
            localStorage.setItem("attendance", obj['attendance']);
            $('#employee_name').html(obj['employee_name']);
            $('#attendance_msg').html(obj['attendance']);
            //alert(obj['uid']);
            // $('#login').hide();
            // $('#attendance').show();
            alert(obj['msg']);
         } else {
            alert("Usuario/Contraseña incorrecto");
         }

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

