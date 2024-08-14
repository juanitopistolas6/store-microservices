import { Product } from '../models/index.js'

export class ProductsRepository {
	static async Products() {
		const products = await Product.find({})

		return products
	}

	static async ProductId({ id }) {
		const product = await Product.findOne({ _id: id })

		if (!product) throw new Error('Product not found.')

		return product
	}

	static async ProductsCategory({ name }) {
		const products = await Product.find({ category: name })

		return products
	}
}
