import express from "express";
import { Roles } from "../enum";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.getByID);
router.post('/', authMiddleware.verifyToken([Roles.Aministrator]), controller.add);
router.put('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.updateById);
router.delete('/:id', authMiddleware.verifyToken([Roles.Aministrator]), controller.deleteById);

export default { router };