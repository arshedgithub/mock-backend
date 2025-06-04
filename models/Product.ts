import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types';

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', productSchema);