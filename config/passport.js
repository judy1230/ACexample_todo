const LocalStrategy = require('passport-local').Strategy  // 載入 passport-local
const FacebookStrategy = require('passport-facebook').Strategy  // 載入 passport-facebook
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')            
    

module.exports =  passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' }, ( email, password, done) =>{
				User.findOne({
					email:email
				}).then((user,err) => {
					if (err) { return done(err); }

					if(!user){
					
						return done(null, false, { message: '帳號不正確, 請重新輸入!' }	)
					}
					  

					bcrypt.compare(password, user.password, (err, isMatch) => {
						
						if (err) throw err;
						if (isMatch) {
							return done(null, user)
						} else {
							return done(null, false, { message: '密碼不正確, 請重新輸入!' })
					}
					
				})
			})
		})	
	)

	passport.use(
		new FacebookStrategy({
			clientID: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK,
			profileFields: ['email', 'displayName']
		}, (accessToken, refreshToken, profile, done) => {
			// find and create user
			User.findOne({
				email: profile._json.email
			}).then(user => {
				// 如果 email 不存在就建立新的使用者
				if (!user) {
					// 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
					let randomPassword = Math.random().toString(36).slice(-8)
					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(randomPassword, salt, (err, hash) => {
							var newUser = User({
								name: profile._json.name,
								email: profile._json.email,
								password: hash
							})
							newUser.save().then(user => {
								return done(null, user)
							}).catch(err => {
								console.log(err)
							})
						})
					)
				} else {
					return done(null, user)
				}
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