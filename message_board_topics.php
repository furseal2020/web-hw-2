<?php
	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);
	
	$sql = "select username, title, content, time, id from topics;";

	$result=mysqli_query($conn,$sql);
	$response=array();

	while($row=mysqli_fetch_array($result))
	{
		array_push($response,array("username"=>$row[0],"title"=>$row[1],"content"=>$row[2],"time"=>$row[3], "topic_id"=>$row[4]));
	}

	echo json_encode(array("server_response"=>$response));

	$result->close();
	$conn->close();
	
?>