<?php

//validate a user's login attempt and respond accordingly 

require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = htmlentities($_POST['username']);
$password_guess = htmlentities($_POST['password']);

$sel_stmt = $mysqli->prepare("SELECT count(*), password FROM users WHERE username=?;");

if(!$sel_stmt)
{
	printf("Query Prep Failed: %s\n", $mysqli->error);
	 exit;
}

$sel_stmt->bind_param('s',$username);
$sel_stmt->execute();
$sel_stmt->bind_result($cnt,$pwd_hash);
$sel_stmt->fetch();
$sel_stmt->close();

if($cnt == 1 && password_verify($password_guess, $pwd_hash)){
	ini_set("session.cookie_httponly", 1);
	session_start();
	session_destroy();
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); // generate a 32-byte random string

	echo json_encode(array(
		"success" => true,
		"token" => $_SESSION['token']
	));
	exit;
}
else
{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password",
		"username" => $username,
		"pwdsuccess" =>  password_verify($password_guess, $pwd_hash),
		"cnt" => $cnt
	));
	exit;
}
?>
