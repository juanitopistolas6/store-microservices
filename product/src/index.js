import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import productsApp from './api/products.js'
import { connectDatabase } from './database/connection.js'

const initServer = () => {
	const { PORT } = config
	const app = express()

	app.use(express.json())
	app.use(cors())

	connectDatabase()

	productsApp(app, '')

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
