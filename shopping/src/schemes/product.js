import zod from 'zod'

const product = zod.object({
	_id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	banner: zod.string(),
	category: zod.string(),
	price: zod.number(),
	supplier: zod.string(),
	units: zod.number(),
})

const productObject = zod.object({
	product,
	units: zod.number(),
})

export function validateProduct(object) {
	return productObject.safeParse(object)
}
