export class StoreQueries {
    public static getStores: string = "SELECT * FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ?";
    public static updateStoreCapacity: string = "UPDATE Stores SET Store_Capacity = ?, Store_Name = ? WHERE Store_ID = ?";

    public static selectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
    public static addNewStore: string = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity, Store_Field_Type, Store_Update_Date) Values (?, ?, ?, ?, ?)";
    public static deleteStore: string = "UPDATE Stores SET Store_Field_Update = ?, Store_Field_Type = ? WHERE Store_ID = ? AND Store_Field_type = 1";

    public static GetUserByLogin: string = `SELECT u.User_id,
                                                u.User_password,
                                                ur.Role_ID
                                            FROM Users AS u 
                                            INNER JOIN Access AS a ON a.Access_User_ID = u.User_id 
                                            INNER JOIN Users_Roles AS ur ON ur.Role_ID = a.Access_Users_Roles_ID 
                                            WHERE u.User_Login = ?`;

    public static UpdateUserById: string = `UPDATE Users SET User_Login = ?, User_Password = ?, User_User_ID = ?, User_Update_Date = ? WHERE User_id = ? AND User_Field_Type = ?`;
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