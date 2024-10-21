import mongoose from 'mongoose'
import { Data } from './data.entity'

const dataSchema = new mongoose.Schema<Data>({
  urlList: Array<string>,
  langList: Array<string>
})

dataSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

export const DataModel = mongoose.model<Data>('Data', dataSchema)
