import express from 'express'
import cors from 'cors'
import { ENV_KEYS } from './config/index.js'
import { connectDatabase } from './database/connection.js'
import shoppingApp from './api/shopping.js'

const initServer = () => {
	const { PORT } = ENV_KEYS

	const app = express()

	app.use(express.json())
	app.use(cors())

	connectDatabase()

	shoppingApp(app, '')

	app
		.listen(PORT, () => {
			console.log(`🚀 shopping microservice running on PORT: ${PORT}`)
		})
		.on('error', () => {
			console.log('error was triggered...')
			proccess.exit()
		})
}

initServer()
