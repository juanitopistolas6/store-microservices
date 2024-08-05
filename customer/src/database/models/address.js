import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Address = new Schema(
	{
		country: { type: String },
		city: { type: String },
		postalCode: { type: String },
		street: { type: String },
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v
				delete ret._id
			},
		},
	}
)

export default mongoose.model('address', Address)
