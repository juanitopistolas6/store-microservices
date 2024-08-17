import { ACTION_EVENTS } from '../../../product/src/utils/types.js'
import { ShoppingRepository } from '../database/repository/shopping-repository.js'
import { validateProduct, validateProductObject } from '../schemes/product.js'
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
			const order = await ShoppingRepository.CreateOrder({ customerId: id })

			const payload = {
				event: ACTION_EVENTS.CREATE_ORDER,
				data: { id, product: order, units: null },
			}

			return {
				data: FormateData(order, 'data'),
				payload,
			}
		} catch (e) {
			return {
				data: FormateData(e.message, 'error'),
				payload: '',
			}
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

	async ManageCart({ id, product, units, remove }) {
		const data = validateProductObject({ product, units })

		if (data.error) return FormateData(data.error, 'error')

		try {
			const result = await ShoppingRepository.ManageCart({
				idCustomer: id,
				products: data.data,
				remove,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	async SubscribeEvents(payload) {
		console.log('Triggering.... Customer Events')

		payload = JSON.parse(payload)

		const { event, data } = payload

		const { id, product, units } = data

		switch (event) {
			case ACTION_EVENTS.ADD_CART:
				this.ManageCart({ id, product, units, remove: false })
				break
			case ACTION_EVENTS.REMOVE_CART:
				this.ManageCart({ id, product, units, remove: true })
				break
		}
	}
}
