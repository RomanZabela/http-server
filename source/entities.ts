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