import mongoose from 'mongoose'
import config from '../../../customer/src/config/index.js'

export const connectDatabase = () => {
	try {
		mongoose.connect(config.DB_URL, {
			autoIndex: true,
		})

		console.log('🚀 MongoDB Connected!')
	} catch (e) {
		console.log(e)
	}
}
