import { ShoppingServices } from '../services/shopping-service.js'
import { customerAuth } from './middleware/customer-auth.js'

export default async (app, channel) => {
	app.get('/whoami', (req, res) => {
		return res.json({ message: 'your a customer :)' })
	})
	app.get('/orders', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.getOrders({ id })

		return res.json(data)
	})

	app.post('/order', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.createOrder({ id })

		return res.json(data)
	})

	app.post('/cart', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.addToCart({ id, data: req.body })

		return res.json(data)
	})

	app.delete('/cart', async (req, res) => {
		const { id } = req.user

		const data = ShoppingServices.deleteItems({ id })

		return res.json(data)
	})

	app.get('/cart', async (req, res) => {
		const { id } = req.user

		const data = await ShoppingServices.getCart({ id })

		return res.json(data)
	})
}
