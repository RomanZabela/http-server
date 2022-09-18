import express from 'express';
import controllers from '../controllers/store.controllers';

const route = express.Router();

route.get('/stores', controllers.getStores);
route.get('/store/:id', controllers.getStoreByID);
route.put('/store-capacity/:id', controllers.updateStoreByID);
route.post('/store-add-new', controllers.addStore);

export default { route };