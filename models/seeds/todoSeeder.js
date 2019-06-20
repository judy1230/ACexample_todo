const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://127.0.0.1/todo',{useNewUrlParser:true})

const db = mongoose.connection

db.on('error', () => {
	console.log('db.error')
})

db.once('open', () => {
	console.log('db connected!')
	let person = ["jack", "1apple"]

	for (let item of person){
		Todo.create({name:item})
	}
	console.log('done!')
})