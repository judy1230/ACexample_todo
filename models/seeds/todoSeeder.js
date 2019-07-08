const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/todo', { useNewUrlParser: true, useCreateIndex: true })

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