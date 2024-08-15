import { ProductsService } from '../services/products-service.js'
import { ACTION_EVENTS } from '../utils/types.js'
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

	app.get('/products/ids', async (req, res) => {
		const data = await ProductsService.getSelectedProducts({ items: req.body })

		return res.json(data)
	})

	app.post('/product', async (req, res) => {
		const data = await ProductsService.createProduct({ product: req.body })

		return res.json(data)
	})

	app.put('/wishlist', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ProductsService.getProductPayload({
			id,
			item: req.body,
			action: ACTION_EVENTS.ADD_WISHLIST,
		})

		console.log(data.payload)

		// TODO: Publicar el mensaje por rabbitmq

		return res.json(data.data)
	})

	app.put('/cart', customerAuth, async (req, res) => {
		const { id } = req.user

		const data = await ProductsService.getProductPayload({
			id,
			item: req.body,
			action: ACTION_EVENTS.ADD_CART,
		})

		// TODO: Publicar el mensaje por rabbitmq

		return res.json(data.data)
	})

	app.delete('/wishlist/:id', customerAuth, async (req, res) => {
		const { id: itemId } = req.params
		const { id } = req.user

		const data = await ProductsService.getProductPayload({
			id,
			item: itemId,
			action: ACTION_EVENTS.REMOVE_WISHLIST,
		})

		// TODO: Publicar el mensaje por rabbitmq

		return res.json(data.data)
	})

	app.delete('/cart/:id', customerAuth, async (req, res) => {
		const { id: itemId } = req.params
		const { id } = req.user

		const data = await ProductsService.getProductPayload({
			id,
			item: itemId,
			action: ACTION_EVENTS.REMOVE_CART,
		})

		// TODO: Publicar el mensaje por rabbitmq

		return res.json(data.data)
	})
}
