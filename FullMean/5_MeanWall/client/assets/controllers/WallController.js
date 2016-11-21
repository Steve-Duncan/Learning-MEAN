//wall controller
app.controller('WallController', ['$scope', '$location', '$cookies', 'wallFactory', function($scope, $location, $cookies, wallFactory) {
 	$scope.posts = [];
 	//get posts and send to view
 	var allPosts = function(posts){
 		$scope.posts = posts;
 		console.log('All posts retrieved')
 	}

 	//this function runs immediately to verify there is a logged in user
	var init = function() {
		console.log("Does the immediate function ever get here?")
		// if cookie does not exist, redirect client to the login page
		if ($cookies.get('username') == undefined) {
			$location.url('/login');
		}
		// otherwise store the cookie to the $scope.username for later use
		// and retrieve all the posts by calling the wall factory
		else {
			$scope.username = $cookies.get('username');
			console.log("In WallController; user found: ", $scope.username)

			// get all posts
			wallFactory.index(allPosts);
		}
	};
	init();

	

	// logout user; remove cookie and redirect to login page
	$scope.logout = function() {
		$cookies.remove("username");
		$location.url('/login');
	}


	$scope.create_post = function(){
		console.log('In wallController, calling factory create post method');
		console.log('username:', $scope.username)
		// call wallFactory to create post
		wallFactory.create_post($scope.username, $scope.newPost, function(status, response) {
				
			if (status == false) {
				// means login failed
				// empty the password field and error
		 		$scope.newPost.message = "";
				$scope.newPostError = response;
				//return to register view
		 		$location.url('/register')
				
			} else {

				// clear login form and errors
				// add to list of posts
					$scope.posts.push(response); // add to list of posts
					$scope.newPost = {}; 
					$scope.newPostError = {};
					// set cookies of user's id so we can check logged in status later
					$cookies.put('user_id', response._id);
					// show the wall view
					//$location.url('/wall');
			} 
		});
	};

$scope.create_comment = function(index) {

		console.log("Index passed from view:", index)
		//this is the id of the current post
		var id = $scope.posts[index]._id;
		console.log('scope.posts[index]._id:', id)
		// get new comment from view form
		var newComment = $scope.posts[index].newComment;
		
		console.log('In WallController create_comment, new comment:', newComment)
		// call wallFactory to create comment on selected post
		wallFactory.create_comment(id, $scope.username, newComment, function(status, response){
			if (status == false) { // means create comment failed
				//return error message
				$scope.commentError = response;
			}
			else { // comment created successfully
				
				// added to the popluated comments of the post
				$scope.posts[index].comments.push(response);
				// clear comment error
				$scope.commentError = {}; 
				// clear comment form
				//$scope.post = {};
				delete $scope.posts[index].newComment;
			}
		});
	}
 }]);