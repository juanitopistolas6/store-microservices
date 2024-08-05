import express from 'express'
import cors from 'cors'
import { connectDatabase } from './database/connection.js'
import customer from './api/customer.js'
import config from './config/index.js'

const initServer = () => {
	const { PORT = 3000 } = config
	const app = express()

	app.use(express.json())
	app.use(cors())

	connectDatabase()

	customer(app, '')

	app
		.listen(PORT, () => {
			console.log(`🚀 Server running on port: ${PORT}!`)
		})
		.on('error', (err) => {
			console.log(err)
			process.exit()
		})
}

initServer()
