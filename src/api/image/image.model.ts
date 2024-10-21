import mongoose from 'mongoose'
import { Image } from './image.entity'

const imageSchema = new mongoose.Schema<Image>({
  url: String,
  language: String,
  description: String,
  tags: String
})

imageSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

export const ImageModel = mongoose.model<Image>('Image', imageSchema)
