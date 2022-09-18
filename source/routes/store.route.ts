import express from 'express';
import controllers from '../controllers/store.controllers';

const route = express.Router();

route.get('/general/stores', controllers.getStores);
route.get('/general/store/:id', controllers.getStoreByID);
route.put('/general/store-capacity/:id', controllers.updateStoreByID);
route.post('/general/store-add-new', controllers.addStore);

export default { route };