import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderScheme = new Schema(
	{
		customerId: { type: String, required: true },
		status: {
			type: String,
			enum: ['pending', 'successful', 'cancelled'],
			default: 'pending',
		},
		amount: { type: Number, required: true },
		items: [
			{
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
				unit: { type: Number, required: true },
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v
			},
		},
	}
)

export default mongoose.model('order', orderScheme)
