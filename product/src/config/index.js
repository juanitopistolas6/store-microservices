import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'prod') {
	const path = `./.env.${process.env.NODE_ENV}`

	dotenv.config({ path })
} else {
	dotenv.config()
}

export default {
	PORT: process.env.PORT,
	DB_URL: process.env.MONGODB_URL,
	APP_SECRET: process.env.SECRET_KEY,
	MSG_URL: process.env.RABBITMQ,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	CUSTOMER_SERVICE: 'customer_service',
	SHOPPING_SERVICE: 'shopping_service',
}
