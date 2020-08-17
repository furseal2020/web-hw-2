<?php
	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);
	
	$topic_id=$_POST["topic_id"];
	
	$sql = "select * from replies where topic_id = '$topic_id';";

	$result=mysqli_query($conn,$sql);
	$response=array();

	while($row=mysqli_fetch_array($result))
	{
		array_push($response,array("username"=>$row[3],"content"=>$row[4],"time"=>$row[5],"reply_id"=>$row[0]));
	}

	echo json_encode(array("server_response"=>$response));

	$result->close();
	$conn->close();

?>