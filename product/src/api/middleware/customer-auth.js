import { verifySignature } from '../../utils/index.js'

export const customerAuth = async (req, res, next) => {
	const verify = await verifySignature(req)

	if (!verify) return res.status(403).json({ error: 'not authorized.' })

	next()
}
