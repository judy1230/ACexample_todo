const express =  require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models/index')
const Todo = db.Todo
const User = db.User

//login

router.get('/login', (req, res)=> {
	//const { email, password } = req.body
	let errors=[]
	errors.push({message:req.flash('error')[0]})
	if (errors[0].message === undefined) {
		res.render('login')	
	}	else {	
	  res.render('login', {
		errors
	  })
  }
})

//login submit //登入檢查
router.post('/login', ( req, res, next) =>{ 	
	if ((!req.body.email) || (!req.body.password)) {
		req.flash('warning_msg', '所有欄位都是必填!')
	}
	passport.authenticate('local', {
	  successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true,
	})(req, res, next)

})


//register
router.get('/register', (req, res) =>{

	res.render('register')
	
})

router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body
	User.findOne({ where: { email: email } }).then(user => {
		if (user) {
			console.log('User already exists')
			res.render('register', {
				name,
				email,
				password,
				password2
			})
		} else {
			const newUser = new User({  //  如果 email 不存在就直接新增
				name,
				email,
				password,
			})
			newUser
				.save()
				.then(user => {
					res.redirect('/')                   // 新增完成導回首頁
				})
				.catch(err => console.log(err))
		}
	})
})

//logout
router.get('/logout', (req, res) => {
	req.logout()
	// 加入訊息提示
	req.flash('success_msg', '你已經成功登出')
	res.redirect('/users/login')
})

module.exports = router