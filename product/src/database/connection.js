import mongoose from 'mongoose'
import config from '../config/index.js'

const { DB_URL } = config

export const connectDatabase = () => {
	try {
		mongoose.connect(DB_URL, {
			autoIndex: true,
		})

		console.log('🚀 MongoDB Connected!')
	} catch (e) {
		console.log(e.message)
	}
}
