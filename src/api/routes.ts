import { Router } from 'express'
import imageRouter from './image/image.router'
import dataRouter from './data/data.router'

const router = Router()

router.use('/images', imageRouter)
router.use('/data', dataRouter)
export default router
