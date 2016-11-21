var mongoose = require('mongoose');
var Post = mongoose.model('Post');
// var Comment = mongoose.model('Comment');
function PostsController() {

	this.index = function(req, res){
	//controller show method
		Post.find({}, false, true).populate('comments').exec( function(err, posts) {
			if (posts == null) {
				console.log("No posts found");
				res.json();
			}
			else {
				console.log("Posts found:", posts);
				res.json(posts);
			}
		});
	}

	// controller create post method
	this.create_post= function(req, res) {
		console.log('In server post controller create_post', req.body)
		var post = new Post({
			username: req.body.username,
			post: req.body.message
		})
		// console.log('In server post controller create_post: ', post, 'by author:', username)
		
		post.save(function(err, post){
			if(err){
				console.log('FAIL')
				res.json({errors: err.errors });
			} else {
				console.log('SUCCESS')
				res.json(post);
			}
			
		})

		

		
		// var password = req.body.password;
		// User.findOne({ username_lowercase: username.toLowerCase() }, function(err, user) {
		// // 	// no user found in database
		// 	if (user == null) {
		// 		console.log("No matching user found!");
		// 		res.json({errors: "No valid user found."})
		// 		//send to register

		// 	}
		// 	else { // compare the passwords
		// 		if (bcrypt.compareSync(password, user.password) == false) {
		// 			console.log("Invalid password!");
		// 			res.json({errors: "Password is not valid."})
		// 		}
		// 		else {
		// 			console.log("Login successful!");
		//   			res.json( req.body.username );
		// 		}
		// 	}
		// });
	};

	

	// this.show = function(req, res) {

	// 	User.findOne({ _id: req.params.id }, function(err, user) {
	// 		if (err) {
	// 			console.log("No user found")
	// 			res.json({errors: "No user found"});
	// 		}
	// 		else {
	// 			console.log("User information found")
	// 			res.json( user );
	// 		}
	// 	});

	// }

}

module.exports = new PostsController();