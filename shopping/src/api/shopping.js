import { ShoppingServices } from '../services/shopping-service.js'
import { PublishMessage, SubscribeMessage } from '../utils/index.js'
import { customerAuth } from './middleware/customer-auth.js'
import { ENV_KEYS } from '../config/index.js'

const { CUSTOMER_SERVICE } = ENV_KEYS

export default async (app, channel) => {
	const service = new ShoppingServices()

	SubscribeMessage(channel, service)

	app.get('/whoami', (req, res) => {
		return res.json({ message: 'your a customer :)' })
	})

	app.get('/order', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.getOrders({ id })

		return res.json(data)
	})

	app.post('/order', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.createOrder({ id })

		PublishMessage(channel, CUSTOMER_SERVICE, data.payload)

		return res.json(data.data)
	})

	app.post('/cart', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.addToCart({ id, data: req.body })

		return res.json(data)
	})

	app.delete('/cart', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.deleteItems({ id, items: req.body })

		return res.json(data)
	})

	app.get('/cart', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.getCart({ id })

		return res.json(data)
	})
}
