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

	static async DeleteCartItems({ idCustomer }) {
		const cart = await Cart.findOne({ idCustomer })

		if (!cart) throw new Error('Cart does not exist')

		await cart.updateOne({ $set: { cart: [] } })

		return await Cart.findOne({ idCustomer })
	}

	static async CreateCart({ idCustomer, items }) {
		const newCart = new Cart({ idCustomer, cart: items })

		return await newCart.save()
	}

	static async ManageCart({ idCustomer, products, remove }) {
		const cart = await Cart.findOne({ idCustomer })

		if (!cart) return await this.CreateCart({ idCustomer, items: products })

		if (remove) {
			const items = cart.cart.find(
				(item) => item._id.toString() === products.product._id
			)

			if (!items) throw new Error('Product not found in cart.')

			const unitsToUpdate = item.units - products.units

			const update =
				unitsToUpdate === 0
					? { $pull: { cart: { 'product._id': products.product._id } } }
					: { $set: { 'cart.$.units': unitsToUpdate } }

			await cart.updateOne(update)

			return await Cart.findOne({ idCustomer })
		} else {
			const item = cart.cart.find(
				(item) => item.product._id.toString() === products.product._id
			)

			const add = { $push: { cart: { products } } }

			await cart.updateOne(add)

			return await Cart.findOne({ idCustomer })
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
