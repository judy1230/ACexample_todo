const express =  require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

//login

router.get('/login', (req, res)=> {
  res.render('login')
})

//login submit //登入檢查
router.post('/login', (req, res, next) =>{
	// res.send('login submit')
	passport.authenticate('local', {
		successRedirect:'/',
		failureRedirect:'/users/login'
	})(req, res, next)
})

//register
router.get('/register', (req, res) =>{
  res.render('register')
})

//register submit 註冊檢查
router.post('/register', (req, res) => {
	//res.send('/users/register submit')
	const { name, email, password, password2 } =req.body
	User.findOne({ email: email }).then((user)=> {
    if(user) {
			console.log('User already exists')
			res.render('/register', { //使用者已經註冊過將返回'/register'
				name,
				email,
				password,
				password2
			})
		} else {
			// 如果 email 不存在就新增使用者
      // 新增完成後導回首頁
			const newUser = new User({
				name,
				email,
				password
			})

			bcrypt.genSalt(10, (err, salt) => {
				// 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err
					newUser.password = hash

					// 用 bcrypt 處理密碼後，再把它儲存起來
					newUser
						.save()
						.then(user => {
							res.redirect('/')
						})
						.catch(err => console.log(err))

				})
				
			})
	   
		}
	})
})

//logout
router.get('/logout', (req, res) => {
	//res.send('logout')
	req.logout()
	res.redirect('/users/login')
})

module.exports = router