module.exports = {
	authenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		req.flash('warning_msg', '請先登入才能使用')         // 加上 warning_msg
		res.redirect('/users/login')
	},
}