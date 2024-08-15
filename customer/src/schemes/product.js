import zod from 'zod'

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
	return productSchema.partial().safeParse(object)
}
