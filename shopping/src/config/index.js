import { config } from 'dotenv'

if (process.env.NODE_ENV === 'dev') {
	const path = `./env.${process.env.NODE_ENV}`
	config({ path })
} else {
	config()
}

const ENV_KEYS = {
	PORT: process.env.PORT,
	DB_URL: process.env.MONGODB_URL,
	APP_SECRET: process.env.SECRET_KEY,
	MSG_URL: process.env.RABBITMQ,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	CUSTOMER_SERVICE: 'customer_service',
	SHOPPING_SERVICE: 'shopping_service',
}

export { ENV_KEYS }
