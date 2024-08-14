import { ProductsRepository } from '../database/repository/products-repository.js'
import { validateCategory } from '../schemes/categories.js'
import { validateID, validateProductPayload } from '../schemes/product.js'
import { FormateData } from '../utils/index.js'

export class ProductsService {
	static async getProducts() {
		const result = await ProductsRepository.Products()

		return FormData(result, 'data')
	}

	static async getProductsCategory({ name }) {
		try {
			const validateName = validateCategory(name)

			const result = await ProductsRepository.ProductsCategory({
				name: validateName,
			})

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async getProduct({ id }) {
		try {
			validateID(id)

			const result = await ProductsRepository.ProductId({ id })

			return FormateData(result, 'data')
		} catch (e) {
			return FormateData(e.message, 'error')
		}
	}

	static async getProductPayload({ id, item, action }) {
		try {
			const { _id, units } = validateProductPayload(item)

			const product = await ProductsRepository.ProductId({ id: _id })

			const payload = {
				event: action,
				data: { id, product, units },
			}

			return {
				data: FormateData(product, 'data'),
				payload,
			}
		} catch (e) {
			return {
				data: FormateData(e.message, 'error'),
				payload: null,
			}
		}
	}
}
