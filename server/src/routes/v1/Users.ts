import express from 'express'
import validate from '../../middlewares/validate'

const router = express.Router()

router.route('/')
    .post(validate())

export default router