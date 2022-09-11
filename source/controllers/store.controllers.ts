import { Request, Response, NextFunction } from 'express';
import { systemError, Stores } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { StoreService } from '../services/store.service';


const storeService: StoreService = new StoreService();

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStores()
    .then((result: Stores[]) => {
        return res.status(200).json({
            message: result
        });
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const getStoreByID = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            storeService.getStore(numericParamOrError)
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
};

const updateStoreByID = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: Stores = req.body;

            storeService.updateStore({
                id: numericParamOrError,
                storeCapacity: body.storeCapacity,
                storeName: body.storeName,
                storeAdress: body.storeAdress
            })
            .then(() => {
                return res.sendStatus(200);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        } else {

        }
    } else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

export default { getStores, getStoreByID, updateStoreByID };