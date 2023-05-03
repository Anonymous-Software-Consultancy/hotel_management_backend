import { Router } from 'express'

import { signin, signup, getUserById } from '../controllers/userController'
import { getAuthenticatedUser, getAuthenticatedSuperUser } from '../middlewares/auth'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/:id', getAuthenticatedUser, getUserById)

export default router
