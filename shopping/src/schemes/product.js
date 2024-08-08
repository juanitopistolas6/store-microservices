import zod from 'zod'

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

const requestBodySchema = zod.object({
	products: zod.array(
		zod.object({
			product: productSchema,
			units: zod.number(),
		})
	),
})

export function validateProduct(object) {
	return requestBodySchema.safeParse(object)
}
