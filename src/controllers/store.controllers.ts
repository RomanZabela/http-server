import { Request, Response, NextFunction } from 'express';
import { NON_EXISTING_ID } from '../constants';
import { AuthenticationRequest, systemError, Stores } from '../entities';
import { Status } from '../enum';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { StoreService } from '../services/store.service';


const errorService: ErrorService = new ErrorService();
const storeService: StoreService = new StoreService(errorService);

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req: Request, res: Response, next: NextFunction) => {
    storeService.getStores()
        .then((result: Stores[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
    })
};

const getStoreByID = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
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

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: Stores = req.body;

            storeService.updateStore({
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
};

const addStore = async (req: Request, res: Response, next: NextFunction) => {
    const body: Stores = req.body;

    storeService.addStore({
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
};

export default { getStores, getStoreByID, updateStoreByID, addStore };