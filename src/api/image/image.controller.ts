import { NextFunction, Request, Response } from 'express'
import imageService from './image.service'
import { Image } from './image.entity'
import { TypedRequest } from '../../utils/typed-request.interface'
import { CreateImageDTO } from './image.dto'
import dotenv from 'dotenv'
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision'
import { ApiKeyCredentials } from '@azure/ms-rest-js'

dotenv.config()

const key = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT

const visualFeatures = [
  'ImageType',
  'Faces',
  'Adult',
  'Categories',
  'Color',
  'Tags',
  'Description',
  'Objects',
  'Brands'
]

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
  endpoint!
)

async function analyzeImage(url: string) {
  try {
    const result = await computerVisionClient.analyzeImage(url, visualFeatures)
    console.log('Analysis Result:', result)
  } catch (err) {
    console.error('Error analyzing image:', err)
  }
}

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await imageService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: TypedRequest<CreateImageDTO>, res: Response, next: NextFunction) => {
  try {
    const { langList, imgList } = req.bodyParser

    const newItem: Partial<Omit<Image, 'id'>> = {
      title: title,
      dueDate: dueDate,
      completed: false
    }

    const saved = await imageService.add(newItem)
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
}
