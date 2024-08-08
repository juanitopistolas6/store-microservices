import { ShoppingRepository } from '../database/repository/shopping-repository.js'
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

	static async addToCart({ id, payload }) {}

	static async getCart({ id }) {
		const result = await ShoppingRepository.Cart({ idCustomer: id })

		return FormateData(result, 'data')
	}

	static async deleteItems({ id }) {
		const result = await ShoppingRepository.DeleteCart({ idCustomer: id })

		return FormateData(result, 'data')
	}
}
