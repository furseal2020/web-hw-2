<?php
	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);

	date_default_timezone_set('Asia/Taipei');

	$topic_id = get_post($conn, 'topic_id');
	$user_id = get_post($conn, 'user_id');
	$username = get_post($conn, 'username');
	$content = get_post($conn, 'content');
	
	$datetime = date('Y-m-d H:i:s');
	
	$query = "INSERT INTO replies VALUES" . "('DEFAULT','$topic_id', '$user_id', '$username', '$content', '$datetime')"; 
	$result = $conn->query($query);
	
	if (!$result) 
	{
		$flag=0;
	}
	else
	{
		$flag=1;
	}
	
	$conn->close();
	
	$array = array("flag" => $flag);
	echo json_encode(array("server_response"=>$array));
	
	function get_post($conn, $var)
	{
		return $conn->real_escape_string($_POST[$var]);
	}
	
?>