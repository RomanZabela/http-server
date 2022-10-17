import { Request } from "express";
import { AppError, Roles } from "./enum";

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

export interface authenticationToken {
    userData: jwsUserData;
}
export interface jwsUserData {
    userId: number;
    roleID: Roles;
}

export interface AuthenticationRequest extends Request, authenticationToken { }

export interface user extends entityWithID {
    firstName: string;
    lastName: string;
    username?: string;
    password?: string;
}