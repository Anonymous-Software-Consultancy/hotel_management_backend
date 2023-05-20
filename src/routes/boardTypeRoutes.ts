import { Router } from 'express'

import { addBoardType, getBoardTypes } from '../controllers/boardTypes'

const router = Router()

router.post('/add-board-type', addBoardType)
router.get('/get-board-type', getBoardTypes)

export default router
