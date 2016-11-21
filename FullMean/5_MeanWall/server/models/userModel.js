var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs/bCrypt.js');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		lowercase: true,
		uniqueCaseInsensitive: true,
		required: [true, 'Username is required'],
		maxlength: [19, "Username: Must be < 20 characters!"],
		validate: {
						validator: function(username) {
							return /^[0-9a-zA-Z]+$/.test(username);
						},
						message: "'{VALUE}' is not a valid username. Please use letters and numbers only! (No spaces or special characters)"
					}
	},
	// email: {
	// 			type: String,
	// 			trim: true,
	// 			lowercase: true,
	// 			unique: true,
	// 			uniqueCaseInsensitive: true,
	// 			required: [true, 'Email address is required'],
	// 			validate: {
	// 				validator: function(email) {
	// 					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	// 				},
	// 				message: '{VALUE} is not a valid email address!'
	// 			}
	// 		},
	first_name: {
					type: String,
					required: [true, "First name is required!"],
					trim: true,
					maxlength: [30, "First name, '{VALUE}', is too long! Maximum length is 20 characters!"],
					validate: {
						validator: function(first_name) {
							return /^[a-zA-Z]+$/.test(first_name);
						},
						message: "'{VALUE}' is not a valid first name. Please use letters only! (No spaces, numbers, or special characters.)"
					}
				},
	last_name: {
					type: String,
					required: [true, "Last name is required"],
					trim: true,
					maxlength: [50, "Last name, '{VALUE}', is too long! Maximum length is 20 characters"],
					validate: {
						validator: function(last_name) {
							return /^[a-zA-Z]+$/.test(last_name);
						},
						message: "'{VALUE}' is not a valid last name. Please use letters only! (No spaces, numbers, or special characters.)"
					}
				},
	birthday: 	{
					type: Date,
					required: [true, "Birthday is required!"]
				},
	password: 	{
					type: String,
					required: [true, "Password is required!"],
					minlength: [8, "Your password is too short! Minimum length is 8!"],
					maxlength: [32, "Your password is too long! Minimum length is 32"],
					validate: {
						validator: function(password) {

										return /^(?=.*[A-Z])[A-Za-z\d$@$!%*?&]{8,32}/.test( password );
									},
									message: "Invalid password, you must have at least 1 uppercase."
					}
				}
}, { timestamps: true});

mongoose.plugin(uniqueValidator, { message: "'{VALUE}' is already taken. Use another {PATH}!"});

// hash password method
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// call method to hash password
UserSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
});

mongoose.model("User", UserSchema);
