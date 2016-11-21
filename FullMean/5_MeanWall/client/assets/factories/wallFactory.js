//userFactory
app.factory("wallFactory", ['$http', function($http) {

	function WallFactory() {

		// call to the backend-server to obtain all the posts populated with the comments
		this.index = function(callback) {
			$http.get('/posts').then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log('[Index: ERROR] failed to retrieve the posts from DB: ' + response);
				}
			);
		}

		// call to login method of server user controller
		this.create_post = function(username, newPost, callback) {
			console.log('In wallFactory create_post, posting for server routes')
			newPost.username = username;
			console.log('In wallFactory, username: ', username)
			$http.post('/posts', newPost).then(
				function success(response) {

					// if post not successful
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else { // else login successful
						callback(true, response.data);
					}

				},
				function error(response) {
					console.log('Message post failed: ' + response);
				}
			);
		}

		// this.create_comment = function(id, username, newComment, callback){
		// 	console.log('In wallFactory create_comment for post id:', id, ' posting for server routes')
		// 	var newComment = {
		// 		username: username,
		// 		comment: newComment
		// 	};
		// 	$http.post('/comments/' + id, newComment).then(
		// 		function success(response){
		// 			if (typeof(response.data.errors) != 'undefined'){
		// 				callback(false, response.data.errors);
		// 			}
		// 			else {
		// 				callback(true, response.data);
		// 			}
		// 		},
		// 		function error(response){
		// 			console.log('Create comment failed: ', response);
		// 		}
		// 	);
		// }
		// call to the server to create a new comment
		this.create_comment = function(id, username, newComment, callback) {
			console.log("Now in wallFactory create_comment, add comment:", newComment, 'for username:', username)
			// create newComment object
			var newComment = {
								username: username,
								comment: newComment
							};
			console.log('newComment object created:', newComment)
			// id is the '_id' of the 'post' that the new 'comment' will be added to.
			$http.post('/comments/' + id, newComment).then(
				function success(response) {
					// console.log('In wallFactory, success; newComment', newComment)
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else {
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log('[Create_comment: ERROR] Creating a new comment failed: ' + response);
				}
			);
		}
	}

	return new WallFactory();
}]);


