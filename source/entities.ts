import { AppError } from "./enum";

export interface Stores extends entityWithID{
    storeName: string;
    storeAdress: string;
    storeCapacity: number;
    storeActive: number;
    storeUpdateDate: Date;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParametr {
    name: string;
    type: any;
    value: string | number;
}

export interface entityWithID {
    id: number;
}

export interface jwsUserData {
    userId: number;
}