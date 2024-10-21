import { ComputerVisionClient } from '@azure/cognitiveservices-computervision'
import { Language } from '@azure/cognitiveservices-computervision/esm/models'
import { ApiKeyCredentials } from '@azure/ms-rest-js'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { TypedRequest } from '../../utils/typed-request.interface'
import { CreateDataDTO } from './data.dto'
import { Data } from './data.entity'
import dataService from './data.service'
import imageService from '../image/image.service'

dotenv.config()

const imgKey = process.env.AZURE_IMG_KEY
const imgEndpoint = process.env.AZURE_IMG_ENDPOINT
const trKey = process.env.AZURE_TR_KEY
const trEndpoint = process.env.AZURE_TR_ENDPOINT

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': imgKey } }),
  imgEndpoint!
)

const translateText = async (text: string, targetLang: string): Promise<string> => {
  const url = `${trEndpoint}/translate?api-version=3.0&to=${targetLang}`

  if (!trKey) {
    throw new Error('Azure Translation Key is not defined')
  }

  const headers = {
    'Ocp-Apim-Subscription-Key': trKey,
    'Ocp-Apim-Subscription-Region': 'eastus',
    'Content-type': 'application/json'
  }

  const requestBody = [{ Text: text }]

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    return data[0].translations[0].text
  } catch (error) {
    console.error('Error translating text:', error)
    throw error
  }
}

async function analyzeImage(lang: Language, url: string) {
  try {
    const result = await computerVisionClient.analyzeImage(url, {
      visualFeatures: ['Tags', 'Description']
    })
    let tags = result.tags?.map((tag) => tag.name).join(', ')
    let description = result.description?.captions?.[0].text
    if (lang !== 'en') {
      tags = await translateText(tags!, lang)
      description = await translateText(description!, lang)
    }
    const data = {
      url: url,
      description: description,
      language: lang,
      tags: tags
    }
    imageService.add(data)
    console.log('Analysis Result:', result)
  } catch (err) {
    console.error('Error analyzing image:', err)
  }
}

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await dataService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: TypedRequest<CreateDataDTO>, res: Response, next: NextFunction) => {
  try {
    const { urlList, langList } = req.body

    const newItem: Partial<Omit<Data, 'id'>> = {
      urlList: urlList,
      langList: langList
    }

    const saved = await dataService.add(newItem)
    for (const lang of langList as Language[]) {
      for (const url of urlList) {
        await analyzeImage(lang, url)
      }
    }
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
}
