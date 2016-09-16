function main() {
//		$(document).ready(function(){

			//make socket connection to server
			var socket = io.connect();

			//send new user to server
			$('#btn_ok').click(function(){
				var name = $('#name').val();
				//hide the prompt
				$('.prompt').hide();
				//send to server
				socket.emit('user_joined',name);
				return false;
			});

			$('#btn_cancel').click(function(){
				//hide the prompt
				$('.prompt').hide();
				//send to server
				socket.emit('cancel_clicked', {});
				return false;
			});

			//receive array of all active users with id for their socket.id; add to new user's page
			socket.on('active_users', function(users){
				for (i=0; i<users.length; i++){
					var id = users[i].user_id
					var name = users[i].name
					$('.container').append("<div class='chat' id=" + id + "><p class='name'>" + name + "</p></div>")
				 };			
			});

			//receive updated user; update all active users pages with new user
			socket.on('update_user', function(user){
				$('.container').append("<div class='chat' id=" + user.user_id + "><p class='name'>" + user.name + "</p></div>")
			});

			//receive user to remove from all users' pages
			socket.on('remove_user', function(user_id){
				$("#" + user_id).fadeOut(1000, function(){
					$(this).remove();
				});
			});

//		});

};