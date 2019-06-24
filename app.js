const express = require('express')          
const app = express()              
const mongoose =  require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1/todo', {useNewUrlParser: true} )

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error!')
})

db.once('open', ()=> {
	console.log('mongodb connected!')
})

//const Todo = require('./models/todo')
app.use('/', require('./routes/home.js'))
app.use('/todos', require('./routes/todos.js'))
app.use('/users', require('./routes/users.js'))

// 設定 express port 3000
app.listen(3000, () => {
	console.log('App is running')
})