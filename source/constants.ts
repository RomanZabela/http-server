export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterSupplied: number = 104;
}

export class General {
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplier";
    public static InputParameterNotSupplied: string = "Input parametr not supplied";
}

export class StoreQueries {
    public static getStores: string = "SELECT * FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ";
    public static updateStoreCapacity: string = "UPDATE Stores SET Store_Capacity = ? WHERE id = ?"
}

export const DB_CONNECTION_STRING: string = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const DB_CLIENT: string = "msnodesqlv8"