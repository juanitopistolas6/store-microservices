import {
	validateCustomer,
	validateLoginCustomer,
	validatePartialCustomer,
	validatePasswordCustomer,
	validateUserCusomter,
} from '../schemes/customer.js'
import {
	FormateData,
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
} from '../utils/index.js'
import { CustomerRepository } from '../database/repository/customer-repository.js'
import { ACTION_EVENTS } from '../../../product/src/utils/types.js'
import {
	validatePartialProduct,
	validateUnitProducts,
} from '../schemes/product.js'
import { validateOrder } from '../schemes/order.js'

export class CustomerService {
	static async signUp(paylod) {
		const data = validateCustomer(paylod)

		if (data.error) return FormateData(data.error, 'error')

		const { data: customer } = data

		const salt = await GenerateSalt()
		const hashedPassword = await GeneratePassword(customer.password, salt)

		customer.salt = salt
		customer.password = hashedPassword

		try {
			const result = await CustomerRepository.createCustomer(customer)

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async getProfile({ user }) {
		try {
			const result = await CustomerRepository.findCustomer({ user })

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async logIn(payload) {
		try {
			const data = validateLoginCustomer(payload)

			const { user, password } = data

			const customer = await CustomerRepository.findCustomer({ user })

			const result = await ValidatePassword(
				password,
				customer.password,
				customer.salt
			)

			if (!result) throw new Error('Error introducing credetials')

			const token = await GenerateSignature({
				id: customer._id,
				name: customer.name,
				user: customer.user,
				type: customer.type,
			})

			return FormateData({ id: customer._id, token }, 'data')
		} catch (e) {
			return FormateData('Error introducing credentials', 'error')
		}
	}

	static async addAddress({ user, payload }) {
		try {
			const data = validatePartialCustomer(payload)

			if (data.error) return FormateData(data.error, 'error')

			const { address } = data.data

			const result = await CustomerRepository.createAddress({
				user,
				payload: address,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async getWishlist({ user }) {
		const result = await CustomerRepository.Wishlisth({ user })

		return FormateData(result, 'data')
	}

	static async getOrders({ user }) {
		const result = await CustomerRepository.Orders({ user })

		return FormateData(result, 'data')
	}

	static async updatePassword({ user, password }) {
		const data = validatePasswordCustomer(password)

		if (!data) return FormateData('password field not found', 'error')

		const customer = await CustomerRepository.findCustomer({ user })

		const newPassword = await GeneratePassword(data.password, customer.salt)

		const result = await CustomerRepository.updatePassword({
			user,
			newPassword,
		})

		return FormateData(result, 'data')
	}

	static async upgradePermissions({ payload }) {
		try {
			const data = validateUserCusomter(payload)

			if (!data) return FormateData('Input Error', 'error')

			const { user } = data

			const result = await CustomerRepository.Admin({ user })

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	async updateCart({ id, product, units, remove }) {
		const data = validateUnitProducts({ product, units })

		if (data.error) return FormateData(data.error, 'error')

		try {
			const result = await CustomerRepository.ManageCart({
				id,
				product: data.data,
				units,
				remove,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	async updateWishlist({ id, product, remove }) {
		const data = validatePartialProduct(product)

		if (data.error) return FormateData(data.error, 'error')

		const result = await CustomerRepository.ManageWishlist({
			id,
			product: data.data,
			remove,
		})

		return FormateData(result, 'data')
	}

	async updateOrders({ id, product }) {
		const data = validateOrder(product)

		if (data.error) return FormateData(data.error, 'error')

		const result = await CustomerRepository.CreateOrder({ id, order: product })

		return FormateData(result, 'data')
	}

	SubscribeEvents = async (payload) => {
		console.log('Triggering.... Customer Events')

		payload = JSON.parse(payload)

		const { event, data } = payload

		const { id, product, units } = data

		switch (event) {
			case ACTION_EVENTS.ADD_WISHLIST:
				this.updateWishlist({ id, product, remove: false })
				break
			case ACTION_EVENTS.ADD_CART:
				this.updateCart({ id, product, units, remove: false })
				break
			case ACTION_EVENTS.REMOVE_CART:
				this.updateCart({ id, product, units, remove: true })
				break
			case ACTION_EVENTS.REMOVE_WISHLIST:
				this.updateWishlist({ id, product, remove: true })
				break
			case ACTION_EVENTS.CREATE_ORDER:
				this.updateOrders({ id, product })
				break
			default:
				break
		}
	}
}
