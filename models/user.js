const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

	name: {
		type: String,
		required:true
	},
	email: {
		type:String,
		required:true,
	},
	password: {
		type:String,
		required:true,
	},
	data:{
		type:Data,
		default: DataCue.new()
	}
})

module.exports = mongoose.model('User',userSchema)