import express from 'express'
import { add, list } from './image.controller'
import { CreateImageDTO } from './image.dto'
import { validate } from '../../utils/validation-middleware'

const router = express.Router()

router.get('/', list)
router.post('/', validate(CreateImageDTO), add)

export default router
