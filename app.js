const express = require('express')               // 載入 express
const app = express()                            // 啟用 express

// 設定第一個首頁路由
app.get('/', (req, res) => {
	res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
	console.log('App is running')
})