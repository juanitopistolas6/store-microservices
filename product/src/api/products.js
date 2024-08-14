import { ProductsService } from '../services/products-service.js'
import { customerAuth } from './middleware/customer-auth.js'

export default async (app, channel) => {
	app.get('/products', customerAuth, async (req, res) => {
		const data = await ProductsService.getProducts()

		return res.json(data)
	})

	app.get('/products/category/:name', async (req, res) => {
		const { name } = req.params

		const data = await ProductsService.getProductsCategory({ name })

		return res.json(data)
	})

	app.get('/product/:id', async (req, res) => {
		const { id } = req.params

		const data = await ProductsService.getProduct({ id })

		return res.json(data)
	})

	app.get('/products/ids', async (req, res) => {})

	app.post('/product', async (req, res) => {})

	app.put('/wishlist', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ProductsService.getProductPayload({
			id,
			item: req.body,
			action: '',
		})

		// TODO: Publicar el mensaje por rabbitmq

		return res.json(data.data)
	})

	app.put('/cart', async (req, res) => {})

	app.delete('/wishlist/:id', async (req, res) => {})

	app.delete('/cart/:id', async (req, res) => {})
}
