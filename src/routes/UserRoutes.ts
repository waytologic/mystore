import express from 'express';
import controller from '../controllers/UserControl';
import { authenticateToken } from '../middleware/authendicateToken';

const router = express.Router();

router.post('/register', controller.userController.register);
router.post('/login', controller.userController.login);
router.post('/logout', authenticateToken, controller.userController.logout);

export = router;
