export class StoreQueries {
    public static getStores: string = "SELECT * FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ?";
    public static updateStoreCapacity: string = "UPDATE Stores SET Store_Capacity = ?, Store_Name = ? WHERE Store_ID = ?";

    public static selectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
    public static addNewStore: string = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity, Store_Field_Type, Store_Update_Date) Values (?, ?, ?, ?, ?)";
    public static deleteStore: string = "UPDATE Stores SET Store_Field_Update = ?, Store_Field_Type = ? WHERE Store_ID = ? AND Store_Field_type";

    public static GetUserByLogin: string = "SELECT User_id, User_password FROM Users Where User_Login = ?";

    public static UpdateUserById: string = "";
    public static AddUser: string = "";
    public static DeleteUserById: string = "";
}

export class SqlParameters {
    public static Id: string = "id";
}

export class StoredProcedures {
    public static AddStore: string = "procedure_from_sql_manager"
}

export const DB_CONNECTION_STRING: string = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const DB_CLIENT: string = "msnodesqlv8"
export const NON_EXISTING_ID: number = -1;
export const TOKEN_KEY: string = "df11cbd1-3916-4b54-b229-5b847dace2e9";