export class StoreQueries {

    //STORE

    public static getStores: string = "SELECT * FROM dbo.Stores WHERE Field_Type = ?";
    public static getStoreByID: string = "SELECT Store_Name FROM dbo.Stores WHERE ID = ? AND Field_Type = ?";
    public static updateStoreById: string = `UPDATE Stores
                                            SET Store_Capacity = ?, Store_Name = ?, Store_Address = ?, Update_Date = ?, User_ID = ?
                                            WHERE ID = ? AND Field_Type = ?`;

    public static selectIdentity: string = "SELECT SCOPE_IDENTITY() AS ID;";
    public static addNewStore: string = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity, Field_Type, Update_Date, User_ID) Values (?, ?, ?, ?, ?, ?)";
    public static deleteStore: string = "UPDATE Stores SET Field_Type = ?, Update_Date = ?, User_ID = ? WHERE ID = ? AND Field_type = ?";

    //EMPLOYEE
}

export class UserQueries {
    public static GetUserByLogin: string = `SELECT u.ID,
                                                u.User_password,
                                                ur.ID as Role_ID
                                            FROM Users AS u
                                            INNER JOIN Access AS a ON a.Access_User_ID = u.ID
                                            INNER JOIN Users_Roles AS ur ON ur.ID = a.Access_Users_Roles_ID
                                            WHERE u.User_Login = ? AND u.Field_Type = ?`;

    public static UpdateUserById: string = `UPDATE Users SET User_Login = ?, User_Password = ?, User_ID = ?, Update_Date = ? WHERE ID = ? AND Field_Type = ?`;
    public static AddUser: string = `INSERT INTO Users (User_Employee_ID, User_Login, User_Password, Field_Type, Update_Date, User_ID)
                                    VALUES (?, ?, ?, ?, ?, ?)`;

    public static GetUserIDByEmployeeID: string = "SELECT ID FROM Users WHERE User_Employee_ID = ? AND Field_Type = ?";
    public static DeleteUser: string = `UPDATE Users
                                        SET Field_Type = ?, User_ID = ?, Update_Date = ?, User_Employee_ID = ?
                                        WHERE ID = ? AND Field_Type = ?`;
}

export class EmployeeQueries {
    public static UpdateEmployeeByLogin: string = `UPDATE Employees 
                                                    SET Employee_FirstName = ?, Employee_LastName = ?, Update_Date = ?, User_ID = ?
                                                    WHERE ID = ? AND Field_Type = ?`;

    public static AddEmployee: string = `INSERT INTO Employees (Employee_FirstName, Employee_LastName, Field_Type, Update_Date, User_ID)
                                        VALUES (?, ?, ?, ?, ?)`;

    public static DeleteEmployee: string = `UPDATE Employees 
                                            SET Field_Type = ?, Update_Date = ?, User_ID = ?
                                            WHERE ID = ? AND Field_Type = ?`;
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