import express from 'express';
import controller from '../controllers/authentication.controllers';
const router = express.Router();

router.post('/login', controller.username);

export default {router};