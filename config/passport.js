const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.js')

module.exports =  passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField:'email'}, (email, password, done) =>{
				User.findOne({
					email:email
				}).then((user) => {
					if(!user){
						return done(null, false, {message:'This email is not registered!'})
			    }
					if(user.password != password) {
						return done(null, false, {message:'Password is not correct!'})
					}

					return done(null, user)
				})
			}
		)
	)
	
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
}