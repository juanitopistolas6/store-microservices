import { object } from 'zod'
import { ShoppingRepository } from '../database/repository/shopping-repository.js'
import { validateProduct } from '../schemes/product.js'
import { FormateData } from '../utils/index.js'

export class ShoppingServices {
	static async getOrders({ id }) {
		const result = await ShoppingRepository.Orders({ customerId: id })

		return FormateData(result, 'data')
	}

	static async getCart({ id }) {
		const result = await ShoppingRepository.Cart({ idCustomer: id })

		return FormateData(result, 'data')
	}

	static async createOrder({ id }) {
		try {
			const result = await ShoppingRepository.CreateOrder({ customerId: id })

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async addToCart({ id, data }) {
		const products = validateProduct(data)

		if (products.error) return FormateData(products.error, 'error')

		try {
			const result = await ShoppingRepository.ManageCart({
				idCustomer: id,
				products: products.data,
				remove: false,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async getCart({ id }) {
		const result = await ShoppingRepository.Cart({ idCustomer: id })

		return FormateData(result, 'data')
	}

	static async deleteItems({ id, items }) {
		try {
			const products = validateProduct(items)

			if (products.error) return FormateData(product.error, 'error')

			const result = await ShoppingRepository.ManageCart({
				idCustomer: id,
				products: products.data,
				remove: true,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}
}
