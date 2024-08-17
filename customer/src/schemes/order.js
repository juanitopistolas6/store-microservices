import z from 'zod'

const orderProcess = z.object({
	_id: z.string(),
	amount: z.number(),
})

export function validateOrder(object) {
	return orderProcess.safeParse(object)
}
