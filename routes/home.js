// routes/home.js
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { authenticated } = require('../config/auth.js')
// 設定首頁路由器
router.get('/', authenticated, (req, res) => {
	Todo.find({})
		.sort({ name: 'asc' })
		.exec((err, todos) => {
			if (err) return console.error(err)
			return res.render('index', { todos: todos })
		})
})
module.exports = router