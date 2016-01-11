<?php
if(isset($_POST["submit"])){
// Checking For Blank Fields..
if($_POST["name"]==""||$_POST["email"]==""||$_POST["message"]==""){
echo "Fill All Fields..";
}else{
// Check if the "Sender's Email" input field is filled out
$email=$_POST['email'];
// Sanitize E-mail Address
$email =filter_var($email, FILTER_SANITIZE_EMAIL);
// Validate E-mail Address
$email= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email){
echo "Invalid Sender's Email";
}
else{
$message = $_POST['message'];
$headers = 'From:'. $email2 . "\r\n"; // Sender's Email
$headers .= 'Cc:'. $email2 . "\r\n"; // Carbon copy to Sender
// Message lines should not exceed 70 characters (PHP rule), so wrap it
$message = wordwrap($message, 70);
// Send Mail By PHP Mail Function
mail("ejpersonalblog@gmail.com", $message, $headers);
echo "Your mail has been sent successfuly ! Thank you for your feedback";
}
}
}
?>
