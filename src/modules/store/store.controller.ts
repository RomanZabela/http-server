import { Request, Response, NextFunction } from "express"
import { NON_EXISTING_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticationRequest, Stores, systemError } from "../../entities";
import { Status } from "../../enum";
import { DateHelper } from "../../framework/date.helper";
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

                const createDate: Date = new Date();

                StoreService.updateStore({
                    ID: numericParamOrError,
                    storeCapacity: body.storeCapacity,
                    storeName: body.storeName,
                    storeAdress: body.storeAdress,
                    storeActive: Status.Active,
                    storeUpdateDate: DateHelper.dateToString(createDate)
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

        const createDate: Date = new Date();

        StoreService.addStore({
            ID: NON_EXISTING_ID,
            storeCapacity: body.storeCapacity,
            storeName: body.storeName,
            storeAdress: body.storeAdress,
            storeUpdateDate: DateHelper.dateToString(createDate),
            storeActive: Status.Active,
        }, (req as AuthenticationRequest).userData.userId)
        .then((result: Stores) => {
            return res.status(200).json(result.storeName);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });

    }
}
export default new StoreController()