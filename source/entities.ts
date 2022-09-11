export interface Stores {
    id: number;
    storeName: string;
    storeAdress: string;
    storeCapacity: number;
}

export interface systemError {
    code: number;
    message: string;
}

export interface sqlParametr {
    name: string;
    type: any;
    value: string | number;
}