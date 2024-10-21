import { Router } from 'express'
import imageRouter from './image/image.router'

const router = Router()

router.use('/images', imageRouter)
export default router
