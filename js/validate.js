$(document).ready(function () {
     
            $("#submit").attr('disabled', 'disabled');
               $("contactform").keyup(function() {
               // To Disable Submit Button
          $("#submit").attr('disabled', 'disabled');
          // Validating Fields
               var name = $("#name").val();
               var email = $("#email").val();
               var message = $("#message").val();
               var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
          if (!(name == "" || email == "" || message == "")) {
               if (filter.test(email)) {
               // To Enable Submit Button
               $("#submit").removeAttr('disabled');
               $("#submit").css({
               "cursor": "pointer",
               "box-shadow": "1px 0px 6px #333"
               });
          }
          }
          });
          // On Click Of Submit Button
          $("#submit").click(function() {
          $("#submit").css({
"cursor": "default",
"box-shadow": "none"
});
alert("Form Submitted Successfully..!!");
});
     
     
     // var name = false;
     // var email = false;
     // var message = false;
 
 
     // // $('#appName').trigger('blur');
 
     // var pattern = /^[a-z0-9 ]+$/i;
     // var emailpattern = /^[a-z0-9@. ]+$/i;
 
     // function disabledNext() {
     //    if (name == true && email == true && message == true) {
     //         $('#send').removeAttr('disabled');
     //    } else {
     //         $('#send').attr('disabled', 'disabled');
     //    }
     // }
     // $('#send').removeAttr('disabled');
 
     // $('#name').load('input', function () {
     //    if (this.value.length != 0) {
     //         name = true;
     //    } else {
     //         name = false;
     //    }
     //    disabledNext();
     // });
 
     // $('#email').load('input', function () {
     //    if (this.value.length != 0) {
     //         email = true;
     //    } else {
     //         email = false;
     //    }
     //    disabledNext();
     // });
     
     // $('#message').load('input', function () {
     //    if (this.value.length != 0) {
     //         message = true;
     //    } else {
     //         message = false;
     //    }
     //    disabledNext();
     // });
 
 
     // $('#name').blur('input', function () {
     //    var nameStyle = document.getElementById('name');
     //    var nameID = document.getElementById('name').value;
     //    if (this.value.length != 0 && pattern.test(nameID)) {
     //         document.getElementById("nameError").innerHTML = '';
     //         name = true;
     //         nameStyle.style.backgroundColor = '#ffffff';
     //    } else {
     //         document.getElementById("nameError").innerHTML = 'Please enter your name.';
     //         name = false;
     //         nameStyle.style.backgroundColor = '#ff9999';
     //    }
     //    disabledNext();
     // });
 
     // $('#email').blur('input', function () {
     //    var emailStyle = document.getElementById('email');
     //    var emailID = document.getElementById('email').value;
     //    if (this.value.length != 0 && emailpattern.test(emailID)) {
     //         document.getElementById("emailError").innerHTML = '';
     //         email = true;
     //         emailStyle.style.backgroundColor = '#ffffff';
     //    } else {
     //         document.getElementById("emailError").innerHTML = 'Please enter a valid email address.';
     //         email = false;
     //         emailStyle.style.backgroundColor = '#ff9999';
     //    }
     //    disabledNext();
     // });
     
     // $('#message').blur('input', function () {
     //    var messageStyle = document.getElementById('message');
     //    var messageID = document.getElementById('message').value;
     //    if (this.value.length != 0 && pattern.test(messageID)) {
     //         document.getElementById("messageError").innerHTML = '';
     //         message = true;
     //         messageStyle.style.backgroundColor = '#ffffff';
     //    } else {
     //         document.getElementById("messageError").innerHTML = 'Please enter a message.';
     //         message = false;
     //         messageStyle.style.backgroundColor = '#ff9999';
     //    }
     //  disabledNext();
     // });
 
  });
