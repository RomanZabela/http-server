import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, Stores } from '../entities';
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
        switch (error.code) {
            case ErrorCodes.ConnectionError:
                return res.status(408).json({
                    errorMessage: error.message
                });
            case ErrorCodes.queryError:
                return res.status(406).json({
                    errorMessage: error.message
                });
            default:
                return res.status(400).json({
                    errorMessage: error.message
                });   
        }
    })
};

const getStoreByID = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    const sId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {

    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    } else {

    }

    if (id > 0) {
        storeService.getStore(id)
        .then((result: Stores) => {
            return res.status(200).json({
                result
            });
        })
        .catch((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.queryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });   
            }
        })
    } else {

    }
};

const updateStore = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    let capacity: string = "";

    const sId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {

    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    } else {

    }

    if (id > 0) {
        storeService.getStore(id)
        .then((result: Stores) => {
            return res.status(200).json({
                result
            });
        })
        .catch((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.queryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });   
            }
        })
    } else {

    }
};

export default { getStores, getStoreByID };