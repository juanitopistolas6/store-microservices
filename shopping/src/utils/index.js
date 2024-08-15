import { ENV_KEYS } from '../config/index.js'
import jwb from 'jsonwebtoken'

const { APP_SECRET, MSG_URL, EXCHANGE_NAME } = config

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

export const PublishMessage = (channel, service, message) => {
	if (!message) return

	const msg = JSON.stringify(message)

	channel.publish(EXCHANGE_NAME, service, Buffer.from(msg))

	console.log(`Message sent to ${service} \n Message: ${message}`)
}

export const createChannel = async () => {
	try {
		const connection = await amqplib.connect(MSG_URL)
		const channel = await connection.createChannel()
		await channel.assertQueue(EXCHANGE_NAME, 'direct', { durable: true })
		return channel
	} catch (err) {
		throw err
	}
}
