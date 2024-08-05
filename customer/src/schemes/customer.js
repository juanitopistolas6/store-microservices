import z from 'zod'

const address = z.object({
	country: z.string().max(20),
	postalCode: z.string().length(5),
	city: z.string(),
	street: z.string(),
})

const customer = z.object({
	name: z.string(),
	lastName: z.string(),
	user: z.string(),
	password: z.string(),
	phoneNumber: z.string().max(10),
	address: address.optional(),
})

export function validateCustomer(object) {
	return customer.safeParse(object)
}

export function validatePartialCustomer(object) {
	return customer.partial().safeParse(object)
}

export function validateLoginCustomer(object) {
	const loginSchema = customer.pick({ user: true, password: true })

	return loginSchema.parse(object)
}

export function validatePasswordCustomer(object) {
	const passwordSchema = customer.pick({ password: true })

	return passwordSchema.parse(object)
}
