import express from 'express'
import { validate } from '../../utils/validation-middleware'
import { CreateDataDTO } from './data.dto'
import { add, list } from './data.controller'

const router = express.Router()

router.get('/', list)
router.post('/', validate(CreateDataDTO), add)

export default router
