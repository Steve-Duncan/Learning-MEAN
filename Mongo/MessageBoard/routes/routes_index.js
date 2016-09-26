module.exports=function (app, Post, Comment){

	// get home page. 
	var msg_errors;
	app.get('/', function (req, res, next) {
		//get users from database
		Post.find({}).populate('comments').exec(function (err, posts){
	  		res.render('pages/index', { title: 'The Dojo Message Board', posts: posts, errors: msg_errors });

		});
	});

	//Add post
	app.post('/new_post', function (req, res) {
		//create new post with form data passed in req; form names must match schema names
	 	var post = new Post(req.body);

	 	//if the form names do not match the schema names, do it this way:
	 	// result = req.body;
	 	// var post = new Post({
	 	// 	author: req.body.name,
	 	// 	text: req.body.message
	 	// });

		//save the post to the database
		post.save(function (err){
			if(err){
				msg_errors = post.errors;
				res.redirect('/');
			} else {
				res.redirect('/');
				msg_errors = undefined;
			};
		});	
	});

	//add comment
	app.post('/posts/:id', function (req, res) {
	  	//get the post with the matching id
	    Post.findOne({_id: req.params.id}, function (err, post){
	    	//create new comment
			var comment = new Comment(req.body);
			//set the comment reference to the post
			comment._post = post._id;
			//save comment to the database
			comment.save(function (err){
		        if (err) {
		        	msg_errors = comment.errors;
					res.redirect('/');
		        } else {
		        	//push the comment to the post's comment array
					post.comments.push(comment);
					post.save(function (err){
			            if (err) {
			            	msg_errors = comment.errors;
							res.redirect('/');
			            } else {
				            res.redirect('/');
							msg_errors = undefined;
			            };
		          	});
		        };
	        });    	      
	    });
	});
};
