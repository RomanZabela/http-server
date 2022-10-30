import { Request, Response, NextFunction } from "express"
import { Stores } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import StoreService from "../store/store.service";

class StoreController {
  constructor() {}

  async getStores(req: any, res: Response, next: NextFunction) {

      StoreService.getStores()
        .then((result: Stores[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((ErrorService) => {
            return ResponseHelper.handleError(res, ErrorService);
        });
    
  }

}

export default new StoreController()