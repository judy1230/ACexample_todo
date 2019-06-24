const express =  require('express')
const router = express.Router()
const User = require('../models/user.js')

//login

router.get('/login', (req, res)=> {
  res.render('login')
})

//login submit
router.post('/login', (req, res) =>{
   res.send('login submit')
})

//register
router.get('/register', (req, res) =>{
  res.render('register')
})

//register submit
router.post('/register', (req, res) => {
	res.send('/users/register submit')
})

//logout
router.get('/logout', (req, res) => {
	res.send('logout')
})

module.exports = router