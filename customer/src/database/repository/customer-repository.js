import customer from '../models/customer.js'
import { CustomerModel, AddressModel } from '../models/index.js'

export class CustomerRepository {
	static async createCustomer(payload) {
		try {
			const costumer = new CustomerModel(payload)

			return await costumer.save()
		} catch (error) {
			throw new Error('Error creating customer.')
		}
	}

	static async findCustomer({ user }) {
		try {
			const profile = await CustomerModel.findOne({ user }).populate('address')

			if (!profile) throw new Error('Profile not found.')

			return profile
		} catch (e) {
			throw new Error(e.message)
		}
	}

	static async createAddress({ user, payload }) {
		try {
			const customer = await CustomerModel.findOne({ user })

			if (!customer) throw new Error('Customer not found.')

			const newAddress = new AddressModel(payload)

			await newAddress.save()

			await customer.updateOne({
				$push: { address: [newAddress] },
			})

			return CustomerModel.findOne({ user }).populate('address')
		} catch (e) {
			throw new Error(e.message)
		}
	}

	static async Wishlisth({ user }) {
		try {
			const customer = await CustomerModel.findOne({ user })

			if (!customer) throw new Error('Customer not found!')

			return customer.wishlist
		} catch (e) {
			throw new Error(e.message)
		}
	}

	static async Orders({ user }) {
		try {
			const costumer = await CustomerModel.findOne({ user })

			return costumer.orders
		} catch (e) {
			throw new Error(e.message)
		}
	}

	static async updatePassword({ user, newPassword }) {
		try {
			const costumer = await CustomerModel.findOne({ user })

			await costumer.updateOne({ password: newPassword })

			return await CustomerModel.findOne({ user })
		} catch (e) {
			throw new Error(e.message)
		}
	}
}
