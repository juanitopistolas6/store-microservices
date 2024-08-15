import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import productsApp from './api/products.js'
import { connectDatabase } from './database/connection.js'
import { createChannel } from './utils/index.js'

const initServer = async () => {
	const { PORT } = config
	const app = express()

	app.use(express.json())
	app.use(cors())

	connectDatabase()

	const channel = await createChannel()

	productsApp(app, channel)

	app
		.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`)
		})
		.on('error', (error) => {
			console.log(error.message)
			process.exit(1)
		})
}

initServer()
