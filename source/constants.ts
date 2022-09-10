export class ErrorCodes {
    public static ConnectionError: number = 100
    public static queryError: number = 101
}

export class General {
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
}

export const DB_CONNECTION_STRING: string = "server=.;Darabase=Haifa_store;Trusted_Connection=Yes;Driver=(SQLServer Native Client 11.0)";

export class StoreQueries {
    public static getStores: string = "SELECT * FROM [Haifa_store].[dbo].[Stores]";
    public static getStoreByID: string = "SELECT * FROM [Haifa_store].[dbo].[Stores] WHERE Store_ID = ";
}