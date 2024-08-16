import z from 'zod'

export const ProductCategory = z.enum([
	'Mobile Phones',
	'Computers and Laptops',
	'Televisions and Home Theater',
	'Cameras and Photography',
	'Audio and Video',
	'Home Appliances',
	'Gadgets and Wearables',
	'Networking and Connectivity',
	'Smart Home',
	'Tools and Electronics Accessories',
	'Electronic Toys',
])
