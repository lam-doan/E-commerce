import Express from 'express';
import {registerUser, loginUser} from '../controllers/authController.js'

const router = Express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;