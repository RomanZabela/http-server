export class ErrorCodes {
    public static ConnectionError: number = 100
    public static queryError: number = 101
}

export class General {
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class StoreQueries {
    public static getStores: string = "SELECT Store_Name FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ";
}