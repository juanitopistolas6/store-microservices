import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const { APP_SECRET } = config

export const verifySignature = async (req) => {
	try {
		const token = req.get('Authorization')

		const data = await jwt.verify(token.substring(7), APP_SECRET)

		req.user = data

		return true
	} catch (e) {
		return false
	}
}

export const FormateData = (data, type) => {
	if (!data) throw new Error('data not found.')

	return { [type]: data }
}
