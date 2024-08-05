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
}
