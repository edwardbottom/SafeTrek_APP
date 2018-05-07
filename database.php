<?php

	//Database boilerplate
	
	/*sets up a data base login */
	$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'SafeTrek');
	if($mysqli->connect_errno) {
		printf("Connection Failed: %s\n", $mysqli->connect_error);
		exit;
	}
?>