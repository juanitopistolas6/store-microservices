import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Customer = new Schema(
	{
		name: { type: String, required: true },
		lastName: { type: String, required: true },
		user: { type: String, unique: true },
		password: { type: String, required: true },
		salt: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		address: [{ type: Schema.Types.ObjectId, ref: 'address' }],
		type: {
			type: String,
			enum: ['Administrator', 'Client'],
			default: 'Client',
		},
		cart: [
			{
				product: {
					_id: { type: String, required: true },
					name: { type: String, required: true },
					banner: { type: String, required: true },
					price: { type: String, required: true },
				},
				units: { type: Number, required: true },
			},
		],
		wishlist: [
			{
				_id: { type: String, required: true },
				name: { type: String },
				price: { type: Number },
				banner: { type: String },
				available: { type: Boolean },
			},
		],
		orders: [
			{
				_id: { type: String },
				amount: { type: Number },
				datetime: { type: Date, default: Date.now() },
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password
				delete ret.salt
				delete ret.__v
			},
		},
	}
)

export default mongoose.model('customer', Customer)
