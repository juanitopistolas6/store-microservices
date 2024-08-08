import { VerifySignature } from '../../utils/index.js'

export const customerAuth = async (req, res, next) => {
	const data = await VerifySignature(req)

	if (!data) return res.status(403).json({ error: 'not authorized.' })

	next()
}
