export class ErrorCodes {
    public static GeneralError: number = 99;
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterSupplied: number = 104;
    public static DeletionConflict: number = 105;
}

export class GeneralMessage {
    public static GeneralErrorMessage: string = "General error. Please, ask to help!";
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplier";
    public static InputParameterNotSupplied: string = "Input parametr not supplied";
    public static DeleteConflict: string = "Delete failed due to conflict";
}

export class StoreQueries {
    public static getStores: string = "SELECT * FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ?";
    public static updateStoreCapacity: string = "UPDATE Stores SET Store_Capacity = ?, Store_Name = ? WHERE Store_ID = ?";

    public static addNewStore: string = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity) Values (?, ?, ?)";
    public static deleteStore: string = "UPDATE Stores SET Store_Field_Update = ?, Store_Field_Type = ? WHERE Store_ID = ? AND Store_Field_type";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const DB_CLIENT: string = "msnodesqlv8"
export const NON_EXISTING_ID: number = -1;