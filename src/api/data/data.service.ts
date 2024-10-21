import { NotFoundError } from '../../errors/not-found'
import { Data } from './data.entity'
import { DataModel } from './data.model'

export class DataService {
  async list(): Promise<Data[]> {
    let results = await DataModel.find()
    return results
  }

  async add(data: Partial<Omit<Data, 'id'>>): Promise<Data> {
    const newItem = await DataModel.create({
      ...data
    })
    const item = await this.getById(newItem.id)
    if (!item) {
      throw new NotFoundError()
    }
    return item
  }

  async getById(id: string): Promise<Data | null> {
    const item = await DataModel.findOne({
      _id: id
    })

    if (!item) {
      return null
    }

    return item
  }
}

export default new DataService()
