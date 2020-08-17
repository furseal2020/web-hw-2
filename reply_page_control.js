var id = ""; //user_id
var topic_id = ""; 
var topic_content="";
var user_name="";

window.onload = getData;

function myCheck()
{
	var reply = document.getElementById("reply");
	
	if(reply.value=="")
	{
		alert("Please input your reply.");
		return false;
	}
};

function mySubmit()
{
	var reply = document.getElementById("reply").value;
	var data = {"topic_id" : topic_id, "user_id" : id, "username" : user_name,"content" : reply};
	var flag = 0;
	
	$.ajax({
		async: false, 
		url:"reply_upload.php", 
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		
		if(response.server_response.flag==1)
		{
			alert("Reply Success.");
			flag = 1;
		}
		else
		{
			alert("Reply Failed.");
		}
		
		},
		error:function(err){
		alert("Ajax failure : reply upload filure.");
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
	topic_id=getCookie("topic_id");
	topic_content=getCookie("topic_content");
	user_name=getCookie("user_name");
	
	document.getElementById("topic_content").innerHTML = topic_content;
	
	
	//列出所有replies
	var json_str = "";
	var data = {"topic_id":topic_id};
	
	if (id!="")
    {	
		$.ajax({
		async: false, 
		url:"reply_page.php", //回傳所有屬於此topic的replies
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		json_str = response.server_response;	    		
		},
		error:function(err){
		alert("Ajax failure : Find all topic replies.");
		}
	    });	   
    
	   //印出表格
	   $(function() {
		new Vue({
		el: '#reply_table',
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
              field: 'reply_id',
              title: 'Action',
              align: 'center',
              valign: 'middle',
			  formatter:function(value,row,index,field){
				if(row.username == user_name)
				{
					return [ 
					'<button type="button" class="btn btn-info btn-sm edit_onclick"><i class="fa fa-angle-double-right"></i>Edit</button>',
					'<button type="button" class="btn btn-info btn-sm delete_onclick"><i class="fa fa-angle-double-right"></i>Delete</button>'
					].join(' ');
				}
				else
				{
				     return "";
				}			
			  },
			  events: {
			   'click .edit_onclick': function (e, value, row) {
				var new_reply = prompt("Edit your reply :", row.content);
				if (new_reply == null || new_reply == "") {
				  //不更改回覆
				} else {
					var data = {"reply_id" : row.reply_id, "new_reply": new_reply};
					
					$.ajax({
					async: false,   
					url:"edit_reply.php",
					type:"post",
					data : data,
					dataType:"json",
					cache:false, 
					success:function(response){ 
					if (response.server_response.flag == 1)
					{
						alert("Edit Reply Success. Please Refresh the page to see the new reply.");
					}
					else
					{
						alert("Edit Reply Failed.")
					}
					},
					error:function(err){
					alert("Ajax failure : Edit reply.");
				}
				});
				
				}
               },
			   'click .delete_onclick': function (e, value, row) {				
				if (confirm("Are you sure you want to delete this reply?")) {
					var data = {"reply_id" : row.reply_id};
					
					$.ajax({
					async: false,   
					url:"delete_a_reply.php",
					type:"post",
					data : data,
					dataType:"json",
					cache:false, 
					success:function(response){ 
					if (response.server_response.flag == 1)
					{
						alert("Reply Deletion Success. Please Refresh the page.");
					}
					else
					{
						alert("Reply Deletion Failed.")
					}
					},
					error:function(err){
					alert("Ajax failure : Delete a reply.");
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
