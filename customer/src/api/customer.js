import { CustomerService } from '../services/customer-service.js'
import { customerAuth } from './middleware/auth-customer.js'

export default (app, channel) => {
	app.post('/signup', async (req, res) => {
		const data = await CustomerService.signUp(req.body)

		res.json(data)
	})

	app.post('/login', async (req, res) => {
		const data = await CustomerService.logIn(req.body)

		return res.json(data)
	})

	app.post('/address', customerAuth, async (req, res) => {
		const { user } = req.user

		const data = await CustomerService.addAddress({ user, payload: req.body })

		res.json({ data })
	})

	app.get('/profile', customerAuth, async (req, res) => {
		const { user } = req.user

		const data = await CustomerService.getProfile({ user })

		return res.json(data)
	})

	app.get('/orders', customerAuth, async (req, res) => {
		const { user } = req.user

		const data = await CustomerService.getOrders({ user })

		return res.json(data)
	})

	app.get('/wishlist', customerAuth, async (req, res) => {
		const { user } = req.user

		const data = await CustomerService.getWishlist({ user })

		return res.json(data)
	})

	app.post('/authorize', customerAuth, (req, res) => {})

	app.patch('/change-password', customerAuth, async (req, res) => {
		const { user } = req.user

		const data = await CustomerService.updatePassword({
			user,
			password: req.body,
		})

		return res.json(data)
	})
}
