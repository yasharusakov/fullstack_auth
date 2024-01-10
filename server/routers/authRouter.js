import {Router} from 'express'
import {body} from 'express-validator'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/registration',
    body('username').isString().isLength({min: 3}),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

export default router