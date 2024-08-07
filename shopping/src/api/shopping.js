export default async (app, channel) => {
	app.get('/whoami', (req, res) => {
		return res.json({ message: 'your a customer :)' })
	})
	app.get('/orders', async (req, res) => {})

	app.post('/order', async () => {})

	app.post('/cart', async (req, res) => {})

	app.put('/cart', async (req, res) => {})

	app.delete('/cart', async (req, res) => {})

	app.get('/cart', async (req, res) => {})
}
