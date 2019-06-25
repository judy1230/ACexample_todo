const express =  require('express')
const router = express.Router()
const passport = require('passport')
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
			// 如果 email 已經存在的話，將不能送出，並回到註冊表單頁面
			res.render('/register', { //使用者已經註冊過將返回'/register'
				name,
				email,
				password,
				password2
			})
		}
		else {
			// 如果 email 不存在就新增使用者
      // 新增完成後導回首頁
			const newUser = new User({
				name,
				email,
				password
			})
			newUser.save().then((user) =>{
				res.redirect('/')
		  }).catch((err)=>{
				console.log(err)
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