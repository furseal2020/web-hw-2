<?php
	require "init.php";

	$reply_id=$_POST["reply_id"];

	$flag = 0;
	
	$sql = "delete from replies where id='$reply_id';";
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