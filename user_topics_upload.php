<?php
	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);

	date_default_timezone_set('Asia/Taipei');

	$user_id = get_post($conn, 'user_id');
	$title = get_post($conn, 'title');
	$content = get_post($conn, 'content');
	
	$sql = "select * from hw2 where id='$user_id';";
	$result=mysqli_query($conn,$sql);
	
	if (mysqli_affected_rows($conn) ==-1 || mysqli_affected_rows($conn)==0) 
	{
		$flag = 0; 
	}
	else
	{
		$row=mysqli_fetch_row($result);
		$username = $row[1];
		$datetime = date('Y-m-d H:i:s');
		
		$query = "INSERT INTO topics VALUES" . "('DEFAULT','$user_id', '$username', '$title', '$content', '$datetime')"; 
		$result = $conn->query($query);
	
		if (!$result) 
		{
			$flag=0;
		}
		else
		{
			$flag=1;
		}		
	}
	

	$conn->close();
	
	$array = array("flag" => $flag);
	echo json_encode(array("server_response"=>$array));


	function get_post($conn, $var)
	{
		return $conn->real_escape_string($_POST[$var]);
	}
?>