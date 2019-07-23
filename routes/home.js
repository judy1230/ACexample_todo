// routes/home.js
const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth.js')
// 設定首頁路由器

router.get('/', authenticated, (req, res) => {
	//req.flash('success_msg','welcome! 你已成功登入')
	User.findByPk(req.user.id)
		.then((user) => {
			if (!user) throw new Error("user not found")

			return Todo.findAll({
				where: { UserId: req.user.id }
			})
		})
		.then((todos) => { return res.render('index', { todos: todos }) })
		.catch((error) => { return res.status(422).json(error) })  
})
module.exports = router