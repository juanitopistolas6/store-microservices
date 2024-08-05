import { VerifySignature } from '../../utils/index.js'

export const customerAuth = async (req, res, next) => {
	const result = await VerifySignature(req)

	if (!result) return res.json({ error: 'Not authorized.' })

	next()
}
