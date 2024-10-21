import { Image } from './image.entity'
import { ImageModel } from './image.model'
import { NotFoundError } from '../../errors/not-found'

export class ImageService {
  async list(): Promise<Image[]> {
    let results = await ImageModel.find()
    return results
  }

  async add(image: Partial<Omit<Image, 'id'>>): Promise<Image> {
    const newItem = await ImageModel.create({
      ...image
    })
    const item = await this.getById(newItem.id)
    if (!item) {
      throw new NotFoundError()
    }
    return item
  }

  async getById(id: string): Promise<Image | null> {
    const item = await ImageModel.findOne({
      _id: id
    })

    if (!item) {
      return null
    }

    return item
  }
}

export default new ImageService()
