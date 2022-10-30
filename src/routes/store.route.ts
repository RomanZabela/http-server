import express from 'express';
import controllers from '../controllers/store.controllers';
import { Roles } from '../enum';
import authMiddleware from '../middleware/auth.middleware';

const route = express.Router();

route.get('/stores', controllers.getStores);
route.get('/store/:id', controllers.getStoreByID);
route.put('/store-capacity/:id', controllers.updateStoreByID);
route.post('/store-add-new', authMiddleware.verifyToken([Roles.Aministrator, Roles.UsualUser]), controllers.addStore);

export default { route };