<?php
	require "init.php";
	date_default_timezone_set('Asia/Taipei');
	
	$reply_id=$_POST["reply_id"];
	$new_content=$_POST["new_reply"];
	
	$datetime = date('Y-m-d H:i:s');
	
	$flag = 0;
	$sql = "update replies set content='$new_content', time='$datetime' where id='$reply_id';";
	
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