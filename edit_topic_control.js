var id = ""; //user_id
var topic_id = "";
var topic_title="";
var topic_content="";

window.onload = getData;

function getData()
{
	id=getCookie("id");
	topic_id=getCookie("topic_id");
	topic_title=getCookie("topic_title");
	topic_content=getCookie("topic_content");
	
	document.getElementById("title").value = topic_title;
	document.getElementById("content").value = topic_content;

};

function myCheck()
{
	var title = document.getElementById("title");
	var content = document.getElementById("content");
	
	if(title.value=="")
	{
		alert("Title cannot be blank.");
		return false;
	}
	if(content.value=="")
	{
		alert("Content cannot be blank.");
		return false;
	}

};

function mySubmit()
{
	var new_title = document.getElementById("title").value;
	var new_content = document.getElementById("content").value;
	
	var data = {"topic_id":topic_id, "new_title" : new_title, "new_content" : new_content};
	var flag = 0;
	
	$.ajax({
		async: false, 
		url:"edit_topic.php",
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		
		if(response.server_response.flag==1)
		{
			alert("Topic Edit Success.");
			flag = 1;
		}
		else
		{
			alert("Topic Edit Failed.");
		}
		
		},
		error:function(err){
		alert("Ajax failure : Edit topic.");
		}
	});	

	if(flag==1)
	{
		return true;
	}
	else
	{
		return false;
	}
};

function getCookie(cname)
{
    var ss = document.cookie; 
	console.log(ss);          //id=xx
    var name = cname + "=";   //id=
    var ca = document.cookie.split(';');
	console.log(ca); //ca[0]存id=xx
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
		console.log(c);   //id=xx
        if (c.indexOf(name)==0){
		return c.substring(name.length,c.length);} //索引位置從 0 開始，頭取尾不取
    }
        return "";
};
