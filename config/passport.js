const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

module.exports =  passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField:'email'}, (email, password, done) =>{
				User.findOne({
					email:email
				}).then((user) => {
					if(!user){
						return done(null, false, {message:'This email is not registered!'})}

					bcrypt.compare(password, user.password, (err, isMatch) => {
						console.log('password', password)
						console.log('user.password = password', password === user.password)
						console.log('isMatch', isMatch)
						if (err) throw err;
						if (isMatch) {
							return done(null, user)
						} else {
							return done(null, false, {message:'Password is not correct!'})
					}
					
				})
			})
		})	
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