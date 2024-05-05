import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { updateUserInfo ,deleteUser,getUser} from '../controllers/userController.js'
const router = express.Router()

router.post('/update/:id',verifyToken, updateUserInfo)


router.delete('delete/:id',verifyToken,deleteUser)
router.get('/:id', verifyToken, getUser)

export default router    