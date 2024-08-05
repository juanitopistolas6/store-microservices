import bcrypt from 'bcrypt'
import jwb from 'jsonwebtoken'
import config from '../config/index.js'

const { APP_SECRET } = config

export const GenerateSalt = async () => {
	return await bcrypt.genSalt()
}

export const GenerateSignature = async (payload) => {
	try {
		return await jwb.sign(payload, APP_SECRET, { expiresIn: '30d' })
	} catch (error) {
		console.log(error)
		return error
	}
}

export const ValidatePassword = async (
	inputPassword,
	databasePassword,
	salt
) => {
	return (await GeneratePassword(inputPassword, salt)) === databasePassword
}

export const GeneratePassword = async (password, salt) => {
	return await bcrypt.hash(password, salt)
}

export const VerifySignature = async (req) => {
	try {
		const signature = req.get('Authorization')

		const payload = await jwb.verify(signature.substring(7), APP_SECRET)

		req.user = payload

		return true
	} catch (e) {
		return false
	}
}

export const FormateData = (data, type) => {
	if (!data) throw new Error('Data not found')

	return { [type]: data }
}
