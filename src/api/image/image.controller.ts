import { NextFunction, Request, Response } from 'express'
import imageService from './image.service'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await imageService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}
