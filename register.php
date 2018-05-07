<?php

	//insert a new account into the database upon user registration
	
	//setup session
	require 'database.php';

	ini_set("session.cookie_httponly", 1);
	session_start();

/*
	//store values
	$username = htmlentities($_POST["username"]);
	$password = password_hash(htmlentities($_POST["password"]),PASSWORD_BCRYPT);
	$address = htmlentities($_POST["address"]);
	$phone_number = htmlentities($_POST["phone_number"]);
	$account_type = htmlentities($_POST["account_type"]);

	if( !preg_match('/^[\w_\.\-]+$/', $username) )
	{
		echo json_encode(array(
		"success" => false,
		"message" => "Invalid username; can only contain upper/lowercase letters, numbers, periods, dashes, and underscores",
		));

		exit;
	}

	$count_stmt = $mysqli->prepare("select count(*) from users where username=?;"); 
	if(!$count_stmt)
	{
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$count_stmt->bind_param('s',$username);
	$count_stmt->execute();
	$count_stmt->bind_result($count);
	$count_stmt->fetch();
	$count_stmt->close();
	if($count > 0)
	{
		echo json_encode(array(
		"success" => false,
		"message" => "Username already taken"		
		));

		exit;
	}

	//sql statements
	$stmt = $mysqli->prepare("insert into users (username, password, account_type, home_address, phone_number) values (?,?,?,?,?);");
	if(!$stmt)
	{
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}

	//execute sql statements
	$stmt->bind_param('sssss', $username, $password, $account_type, $address, $phone_number);

	$stmt->execute();

	$stmt->close();
*/
	echo json_encode(array(
		"success" => true,
		"message" => "Account created!"		
		));
?>

