import express from 'express'
import { list } from './image.controller'

const router = express.Router()

router.get('/', list)

export default router
