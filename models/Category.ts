import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types';

const categorySchema = new Schema({
    name: { type: String, required: true },
}, { timestamps: true });

export const Category = mongoose.model<ICategory>('Category', categorySchema);