<?php
	require "init.php";

	$topic_id=$_POST["topic_id"];

	$flag = 0;
	
	$sql = "delete from topics where id='$topic_id';";
	if(mysqli_query($conn,$sql))
	{
		$flag = 1;
	}
	else
	{
		$flag = 0;
	}
	
	$array = array("flag" => $flag);
	echo json_encode(array("server_response"=>$array));
	
	$conn->close();

?>