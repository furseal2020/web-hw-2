var id = ""; //user_id
window.onload = getData;

function myCheck()
{
	var title = document.getElementById("title");
	var content = document.getElementById("content");
	
	if(title.value=="")
	{
		alert("Please input your title.");
		return false;
	}
	if(content.value=="")
	{
		alert("Please input your content.");
		return false;
	}

};

function mySubmit()
{
	var title = document.getElementById("title").value;
	var content = document.getElementById("content").value;
	
	var data = {"user_id":id, "title" : title, "content" : content};
	var flag = 0;
	
	$.ajax({
		async: false, 
		url:"user_topics_upload.php",
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		
		if(response.server_response.flag==1)
		{
			alert("Submit Success.");
			flag = 1;
		}
		else
		{
			alert("Submit Failed.");
		}
		
		},
		error:function(err){
		alert("Ajax failure.");
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

function getData()
{
	id=getCookie("id");
	
	//列出所有topics
	var json_str = "";
	
	if (id!="")
    {	
		$.ajax({
		async: false, 
		url:"message_board_topics.php", //回傳所有topics
		type:"post",
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		json_str = response.server_response;	    		
		},
		error:function(err){
		alert("Ajax failure : Find all topics.");
		}
	    });	   
    
	   //找出此user_id的user_name
	   var user_name = "";
	   var data = {"user_id" : id};
	   
	   $.ajax({
		async: false, 
		url:"find_username_by_id.php", 
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 

		user_name = response.server_response.user_name; 
		},
		error:function(err){
		alert("Ajax failure : Find username by id.");
		}
	    });
	
	
	   //印出表格
	   $(function() {
		new Vue({
		el: '#topic_table',
		components: {
			'BootstrapTable': BootstrapTable
		},
		data: {
			columns: [
			{
              field: 'username', 
              title: 'Username', 
              align: 'center', 
              valign: 'middle' 
			}, {
              field: 'title', 
              title: 'Title', 
              align: 'center', 
              valign: 'middle' 
			}, {
              field: 'content',
              title: 'Content',
              align: 'center',
              valign: 'middle'
			}, {
              field: 'time',
              title: 'Time',
              align: 'center',
              valign: 'middle'
			}, {
              field: 'topic_id',
              title: 'Action',
              align: 'center',
              valign: 'middle',
			  formatter:function(value,row,index,field){
				if(row.username == user_name)
				{
					return [
					'<button type="button" class="btn btn-info btn-sm reply_onclick"><i class="fa fa-angle-double-right"></i>Reply</button>', 
					'<button type="button" class="btn btn-info btn-sm edit_onclick"><i class="fa fa-angle-double-right"></i>Edit</button>',
					'<button type="button" class="btn btn-info btn-sm delete_onclick"><i class="fa fa-angle-double-right"></i>Delete</button>'
					].join(' ');
				}
				else
				{
					return [
					'<button type="button" class="btn btn-info btn-sm reply_onclick"><i class="fa fa-angle-double-right"></i>Reply</button>'
					].join(' ');
				}			
			  },
			  events: {
              'click .reply_onclick': function (e, value, row) {
				document.cookie = "topic_id=" + row.topic_id;
				document.cookie = "topic_content=" + row.content;
				document.cookie = "user_name=" + user_name;
				window.location.href = "http://localhost/web_hw/reply_page_web.html";
               },
			   'click .edit_onclick': function (e, value, row) {
				document.cookie = "topic_id=" + row.topic_id;
				document.cookie = "topic_title=" + row.title;
				document.cookie = "topic_content=" + row.content;
				window.location.href = "http://localhost/web_hw/edit_topic_web.html";
               },
			   'click .delete_onclick': function (e, value, row) {				
				if (confirm("Are you sure you want to delete this topic?")) {
					var topic_id = row.topic_id;
					var data = {"topic_id" : topic_id};
					
					$.ajax({
					async: false,   
					url:"delete_a_topic.php",
					type:"post",
					data : data,
					dataType:"json",
					cache:false, 
					success:function(response){ 
					if (response.server_response.flag == 1)
					{
						alert("Topic Deletion Success. Please Refresh the page.");
					}
					else
					{
						alert("Topic Deletion Failed.")
					}
					},
					error:function(err){
					alert("Ajax failure : Delete a topic.");
					}
					});
					
					}			   
                  }  			  
				}
			}
		  ],
	      data: json_str
        }
    })
  })	
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

