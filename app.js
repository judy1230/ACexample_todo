const express = require('express')
const app = express()
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
	require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash') // 載入 connect-flash  
 
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true, useCreateIndex: true })

db.on('error', () => {
	console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')
})

// 使用 express session 
app.use(session({
	secret: 'aaaaaaaaaaaaaaa',
	resave: 'false',
	saveUninitialized: 'false'   // secret: 定義一組自己的私鑰（字串)
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)


app.use(flash()) 

app.use(( req, res, next) => {
	res.locals.user = req.user
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})



//const Todo = require('./models/todo')
app.use('/', require('./routes/home.js'))
app.use('/todos', require('./routes/todos.js'))
app.use('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auths'))

// 設定 express port 3000
app.listen(3000, () => {
	console.log('App is running')
})