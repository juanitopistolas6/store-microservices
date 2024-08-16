import zod from 'zod'
import { ProductCategory } from './category.js'

const productSchema = zod.object({
	_id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	banner: zod.string(),
	category: ProductCategory,
	price: zod.number(),
	supplier: zod.string(),
	units: zod.number(),
})

export function validatePartialProduct(object) {
	const payloadScheme = productSchema.pick({
		_id: true,
		name: true,
		banner: true,
		price: true,
	})

	return payloadScheme.safeParse(object)
}

export function validateUnitProducts(object) {
	const payloadScheme = zod.object({
		product: productSchema.partial(),
		units: zod.number(),
	})

	return payloadScheme.safeParse(object)
}
