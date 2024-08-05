import { VerifySignature } from '../../utils/index.js'

export const administratorAuth = async (req, res, next) => {
	const customerData = await VerifySignature(req)

	if (!customerData) return res.json({ error: 'not authorized' })

	const { type } = req.user

	if (type !== 'Administrator')
		return res.json({ error: 'not enough permissions to perform this action.' })

	next()
}
