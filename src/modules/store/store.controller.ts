import { Request, Response, NextFunction } from "express"
import { NON_EXISTING_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticationRequest, Stores, systemError } from "../../entities";
import { Status } from "../../enum";
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

    async getStoreByID(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                StoreService.getStore(numericParamOrError)
                .then((result: Stores) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
            });
            }
            else {

            }
        } else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async updateStoreByID(req: Request, res: Response, next: NextFunction) {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: Stores = req.body;

                StoreService.updateStore({
                    id: numericParamOrError,
                    storeCapacity: body.storeCapacity,
                    storeName: body.storeName,
                    storeAdress: "HaManiem 31",
                    storeActive: Status.Active,
                    storeUpdateDate: ""
                }, (req as AuthenticationRequest).userData.userId)
                .then((result: Stores) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
            } else {

            }
        } else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async addStore(req: Request, res: Response, next: NextFunction) {
        const body: Stores = req.body;

        StoreService.addStore({
            id: NON_EXISTING_ID,
            storeCapacity: body.storeCapacity,
            storeName: body.storeName,
            storeAdress: body.storeAdress,
            storeUpdateDate: "",
            storeActive: Status.Active,
        }, (req as AuthenticationRequest).userData.userId)
        .then((result: Stores) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });

    }
}
export default new StoreController()