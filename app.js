const express = require('express')               
const app = express()              
const mongoose =  require('mongoose')

mongoose.connect('mongodb://127.0.0.1/todo', {useNewUrlParser: true} )

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error!')
})

db.once('open', ()=> {
	console.log('mongodb connected!')
})

const Todo = require('./models/todo')

// 設定第一個首頁路由
app.get('/', (req, res) => {
	res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
	console.log('App is running')
})