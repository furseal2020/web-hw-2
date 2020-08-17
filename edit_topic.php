<?php
	require "init.php";
	date_default_timezone_set('Asia/Taipei');
	
	$topic_id=$_POST["topic_id"];
	$new_title=$_POST["new_title"];
	$new_content=$_POST["new_content"];
	
	$datetime = date('Y-m-d H:i:s');
	
	$flag = 0;
	$sql = "update topics set title='$new_title', content='$new_content', time='$datetime' where id='$topic_id';";
	
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