import zod from 'zod'

const productSchema = zod.object({
	_id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	banner: zod.string(),
	category: zod.string(),
	price: zod.number(),
	units: zod.number(),
})

const productSchemaArray = zod.object({
	products: zod.array(
		zod.object({
			product: productSchema,
			units: zod.number(),
		})
	),
})

const productSchemeObject = zod.object({
	product: productSchema,
	units: zod.number(),
})

export function validateProductArray(object) {
	return productSchemaArray.safeParse(object)
}

export function validateProduct(object) {
	return productSchemeObject.safeParse(object)
}

export function validateProductObject(object) {
	return productSchemeObject.safeParse(object)
}
