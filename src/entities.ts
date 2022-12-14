import { Request } from "express";
import { AppError, Roles } from "./enum";

export interface Stores extends entityWithID {
    storeName: string;
    storeAdress: string;
    storeCapacity: number;
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
    ID: number;
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
    user_Employee_ID: number;
    User_Login?: string;
    User_Password?: string;
}

export interface administrativeInformation {
    Update_Date: string;
    Field_Type: number;
    User_ID: number;
}

export interface Employee extends entityWithID {
    FirstName: string;
    LastName: string;
}