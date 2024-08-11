import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CartSquema = new Schema(
	{
		idCustomer: { type: String, unique: true, required: true },
		cart: [
			{
				_id: false,
				product: {
					_id: { type: String, required: true },
					name: { type: String },
					description: { type: String },
					banner: { type: String },
					category: { type: String },
					price: { type: Number },
					suplier: { type: String },
					units: { type: Number },
				},
				units: { type: Number, required: true },
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v
				delete ret.cart._id
			},
		},
	}
)

export default mongoose.model('cart', CartSquema)
