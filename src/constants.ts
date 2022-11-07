export class StoreQueries {
    public static getStores: string = "SELECT * FROM dbo.Stores";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE ID = ?";
    public static updateStoreCapacity: string = "UPDATE Stores SET Store_Capacity = ?, Store_Name = ? WHERE ID = ?";

    public static selectIdentity: string = "SELECT SCOPE_IDENTITY() AS ID;";
    public static addNewStore: string = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity, Store_Field_Type, Store_Update_Date, Store_User_ID) Values (?, ?, ?, ?, ?, ?)";
    public static deleteStore: string = "UPDATE Stores SET Store_Field_Update = ?, Store_Field_Type = ? WHERE ID = ? AND Store_Field_type = 1";

    public static GetUserByLogin: string = `SELECT u.ID,
                                                u.User_password,
                                                ur.ID as Role_ID
                                            FROM Users AS u 
                                            INNER JOIN Access AS a ON a.Access_User_ID = u.ID 
                                            INNER JOIN Users_Roles AS ur ON ur.ID = a.Access_Users_Roles_ID 
                                            WHERE u.User_Login = ?`;

    public static UpdateUserById: string = `UPDATE Users SET User_Login = ?, User_Password = ?, User_User_ID = ?, User_Update_Date = ? WHERE ID = ? AND User_Field_Type = ?`;
    public static AddUser: string = `Insert into Users (User_Employee_ID, User_Login, User_Password, User_Field_Type, User_Update_Date, User_User_ID)
                                    Values (?, ?, ?, ?, ?, ?)`;
    public static DeleteUserById: string = "";
}

export class SqlParameters {
    public static Id: string = "ID";
}

export class StoredProcedures {
    public static AddStore: string = "procedure_from_sql_manager"
}

export const DB_CONNECTION_STRING: string = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const DB_CLIENT: string = "msnodesqlv8"
export const NON_EXISTING_ID: number = -1;
export const TOKEN_KEY: string = "df11cbd1-3916-4b54-b229-5b847dace2e9";