function main() {

	//make socket connection to server
	var socket = io.connect();
	var name = '';

	//give focus to name field
	$('#name').focus();

	//send new user to server
	$('#btn_ok').click(function(){
		name = $('#name').val();
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
	
	//receive array of all messages; add to new user's page
	socket.on('all_messages', function (messages){
		//unhide the messages container
		$('.container').show();
		//add <p> for each message to user's window
		for (var i=0; i<messages.length; i++){
			$('.messages').append("<p>" + messages[i].user + ":  " + messages[i].msg + "</p>")			
		};
		//keep scroll at bottom of chat window
		$('.messages').scrollTop(1E10);			
	});

	//send message to server
	$('#btn_send').click(function(){
		var msg = $('#message').val();
		//trap for blank messages
		if (!msg==''){
			socket.emit('send_msg', msg, name);
			$('#message').val('');
		};
	});

	//listen for new messages from server
	socket.on('new_msg', function (msg){
		//write to page
		$('.messages').append("<p>" + msg.user + ":  " + msg.msg + "</p>")
		//keep scroll at bottom of chat window
		$('.messages').scrollTop(1E10);
	});

	//listen for new message
	socket.on('update_msg', function (msg){
		$('.messages').append("<p>" + msg + "</p>")
		//keep scroll at bottom of chat window
		$('.messages').scrollTop(1E10);
	});

};