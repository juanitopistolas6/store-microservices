import { Cart, Order } from '../models/index.js'

export class ShoppingRepository {
	static async Orders({ customerId }) {
		const orders = await Order.find({ customerId })

		return orders
	}

	static async Cart({ idCustomer }) {
		const cart = await Cart.findOne({ idCustomer })

		return cart
	}

	static async DeleteCart({ idCustomer }) {
		const cart = await Cart.findOne({ idCustomer })

		await cart.updateOne({ $set: { cart: [] } })

		return await Cart.findOne({ idCustomer })
	}

	static async ManageCart({ idCustomer, products, remove }) {
		if (remove) {
			const cart = await Cart.findOne({ idCustomers })

			if (!cart) throw new Error('Cart is empty')

			const items = cart.cart
			// TODO
		}
	}

	static async CreateOrder({ customerId }) {
		const cartdb = await Cart.findOne({ idCustomer: customer })

		if (!cartdb) throw new Error('Cart not found.')
		if (!cartdb.cart) throw new Error('Cart is empty.')

		const { cart } = cartdb

		let amount

		cart.cart.forEach((item) => {
			amount += item.product.price * item.units
		})

		const newOrder = new Order({ customerId, amount, items: cart })

		await cartdb.updateOne({ $set: { cart: [] } })

		return await newOrder.save()
	}
}
