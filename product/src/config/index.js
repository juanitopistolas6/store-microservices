import dotenv from 'dotenv'

if (process.env.NODE_ENV.trim() === 'prod') {
	const path = `./.env.${process.env.NODE_ENV}`

	dotenv.config({ path })
} else {
	dotenv.config()
}

export default {
	PORT: process.env.PORT,
	DB_URL: process.env.MONGODB_URL,
	APP_SECRET: process.env.SECRET_KEY,
}
