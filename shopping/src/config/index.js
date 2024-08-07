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
}

export { ENV_KEYS }
