<?php
	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);
	
	$user_id=$_POST["user_id"];
	
	$sql = "select name from hw2 where id='$user_id';";

	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	
	$array = array("user_name" => $row[0]);
	
	echo json_encode(array("server_response"=>$array));

	$result->close();
	$conn->close();
?>