var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

function CommentsController () {

	// controller which create a new comment.
	this.create_comment = function(req, res) {
		console.log("Did we make it to commentsController?")
		// due to the association, need to find the post that the new comment
		// is associated with first.
		Post.findOne({_id: req.params.id}, function(err, post) {
			console.log('Post returned:', post)
			// data from the form on the front end
			var comment = new Comment(req.body);
			console.log("New comment to add:", comment.comment)
			// setting the reference
			comment._post = post._id;

			console.log('Add comment id:', comment._id, 'to post id:', post._id)
			// post._id;
			// now save both to the DB
			comment.save(function(err, comment) {
				if (err) { // if err, the new comment did not meet the validation requirement. Send errors.
					console.log("[create_comment: ERROR] comment validation failed: ", err);
					res.json({ errors: err.errors });
				}
				else { // else comment validation is good. new comment is stored in DB. Now, save to the associated post.
					post.comments.push(comment);
					console.log('New comment: ', comment.comment, 'to new message:', comment._post)
					post.save(); // should not have error since its just saving the comment
					res.json(comment);
				}
			});
		});
		
	}

}

module.exports = new CommentsController();

// var mongoose = require('mongoose');
// var Post = mongoose.model('Post');
// var Comment = mongoose.model('Comment');

// function CommentController(){
// 	// controller create comment method
// 	this.create_comment= function(req, res) {
// 		console.log('In server comment controller create_comment', req.body)
// 		Post.findOne({_id: req.params.id}, function(err, post){

		
// 			var comment = new Comment(req.body);
// 			comment._post = post._id;
// 			comment.save(function(err, comment){
// 				if(err){
// 					res.json({errors: err.errors });
// 				} else {
// 					post.comments.push(comment);
// 					console.log('New comment: ', comment)
// 					post.save();
// 					res.json(comment);
// 				}
// 			})
				
// 		});
				
// 	};
			
			
// };


// module.exports = new CommentController();