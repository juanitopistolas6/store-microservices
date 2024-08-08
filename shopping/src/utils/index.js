import { ENV_KEYS } from '../config/index.js'
import jwb from 'jsonwebtoken'

const { APP_SECRET } = ENV_KEYS

export const VerifySignature = async (req) => {
	try {
		const auth = req.get('Authorization')

		const data = await jwb.verify(auth.substring(7), APP_SECRET)

		req.user = data

		return true
	} catch (e) {
		return false
	}
}

export const FormateData = (data, type) => {
	if (!data) throw new Error('Data not found')

	return { [type]: data }
}
