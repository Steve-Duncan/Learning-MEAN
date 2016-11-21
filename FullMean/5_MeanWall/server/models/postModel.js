
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// post model
var postSchema = new mongoose.Schema({

	username: 	{
					type: String,
				},
	post: 	{
				type: String,
				required: [true, "Please write something before you add a post!"],
				maxlength: [449, "Your post is too long! Please write less than 500 characters!"],
			},
	// create association with comment model
	comments: 	[{	type: Schema.Types.ObjectId, ref: 'Comment'	}]
}, { timestamps: true });


// comment model
var commentSchema = new mongoose.Schema({
	// create association with post model
	_post: {type: Schema.Types.ObjectId, ref: 'Post'},
	username: 	{
					type: String,
				},
	comment: {
				type: String,
				required: [true, "Please write something before you add a comment!"],
				maxlength: [249, "Your comment is too long! Please write less than 250 characters!"],
			}
}, {timestamps: true});

mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);