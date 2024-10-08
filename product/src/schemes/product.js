import zod from 'zod'
import { ProductCategory } from './categories.js'

const objectIdRegex = /^[0-9a-fA-F]{24}$/

const objectIdSchema = zod
	.string()
	.regex(objectIdRegex, 'Invalid MongoDB ObjectId format')

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

const bodyRequest = zod.object({
	product: productSchema,
})

export const validateProduct = (object) => {
	return bodyRequest.safeParse(object)
}

export const validateID = (string) => {
	return objectIdSchema.parse(string)
}

export const validateProductPayload = (object) => {
	const productPayload = productSchema.pick({ _id: true, units: true })

	return productPayload.parse(object)
}

export const validateProductArray = (object) => {
	const scheme = zod.object({
		products: zod.array(objectIdSchema),
	})

	return scheme.safeParse(object)
}
