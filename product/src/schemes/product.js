import zod, { object } from 'zod'

const objectIdRegex = /^[0-9a-fA-F]{24}$/

const objectIdSchema = zod
	.string()
	.regex(objectIdRegex, 'Invalid MongoDB ObjectId format')

const productSchema = zod.object({
	_id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	banner: zod.string(),
	category: zod.string(),
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
