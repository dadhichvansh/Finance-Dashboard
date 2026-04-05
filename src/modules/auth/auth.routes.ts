import express from 'express';

import { register, login, logout } from './auth.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  loginSchema,
  registerSchema,
} from '../../utils/validators/auth.validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

export default router;
