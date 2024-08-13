import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
	name: { type: String },
	description: { type: String },
	banner: { type: String },
	category: { type: String },
	price: { type: Number },
	suplier: { type: String },
	units: { type: Number },
})

export default mongoose.model('product', productSchema)
