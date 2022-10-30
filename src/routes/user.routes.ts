import express from "express";
import { Roles } from "../enum";
import authMiddleware from "../middleware/auth.middleware";
import controller from '../controllers/user.controller'

const router = express.Router();

router.get('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.getById);
router.post('/', authMiddleware.verifyToken([Roles.Aministrator]), controller.add);
router.put('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.updateById);
router.delete('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.deleteById);

export default { router };