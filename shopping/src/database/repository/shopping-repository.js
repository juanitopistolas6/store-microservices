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

		const itemFound = cart.cart.find(
			(item) => item.product._id.toString() === products.product._id
		)

		if (remove) {
			// REMOVER
			if (!itemFound) throw new Error('Product not found in cart.')

			const unitsToUpdate = itemFound.units - products.units
			console.log(itemFound)

			if (unitsToUpdate <= 0) {
				await Cart.updateOne(
					{ idCustomer, 'cart.product._id': itemFound.product._id },
					{ $pull: { cart: { 'product._id': itemFound.product._id } } }
				)
			} else {
				await Cart.updateOne(
					{ idCustomer, 'cart.product._id': itemFound.product._id },
					{ $set: { 'cart.$.units': unitsToUpdate } }
				)
			}
		} else {
			// AÑADIR
			if (itemFound) {
				await Cart.updateOne(
					{ idCustomer, 'cart.product._id': itemFound.product._id },
					{ $set: { 'cart.$.units': itemFound.units + products.units } }
				)
			} else {
				await Cart.updateOne({ idCustomer }, { $push: { cart: products } })
			}
		}

		return await Cart.findOne({ idCustomer })
	}

	static async CreateOrder({ customerId }) {
		const cartdb = await Cart.findOne({ idCustomer: customerId })

		if (!cartdb) throw new Error('Cart not found.')
		if (!cartdb.cart) throw new Error('Cart is empty.')

		const { cart } = cartdb

		let amount = 0

		cart.forEach((item) => {
			amount += item.product.price * item.units
		})

		console.log(cart)

		const newOrder = new Order({ customerId, amount, items: cart })

		await cartdb.updateOne({ $set: { cart: [] } })

		return await newOrder.save()
	}
}
