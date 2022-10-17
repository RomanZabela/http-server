"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_KEY = exports.TEMP_USER_ID = exports.NON_EXISTING_ID = exports.DB_CLIENT = exports.DB_CONNECTION_STRING = exports.StoreQueries = void 0;
class StoreQueries {
}
exports.StoreQueries = StoreQueries;
StoreQueries.getStores = "SELECT * FROM dbo.Stores";
StoreQueries.getStoreByID = "SELECT Store_Name FROM dbo.Stores WHERE Store_ID = ?";
StoreQueries.updateStoreCapacity = "UPDATE Stores SET Store_Capacity = ?, Store_Name = ? WHERE Store_ID = ?";
StoreQueries.selectIdentity = "SELECT SCOPE_IDENTITY() AS id;";
StoreQueries.addNewStore = "INSERT INTO Stores (Store_Name, Store_Address, Store_Capacity, Store_Field_Type, Store_Update_Date) Values (?, ?, ?, ?, ?)";
StoreQueries.deleteStore = "UPDATE Stores SET Store_Field_Update = ?, Store_Field_Type = ? WHERE Store_ID = ? AND Store_Field_type";
StoreQueries.GetUserByLogin = "SELECT User_id, User_password FROM Users Where User_Login = ?;";
exports.DB_CONNECTION_STRING = "server=.;Database=Haifa_store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
exports.DB_CLIENT = "msnodesqlv8";
exports.NON_EXISTING_ID = -1;
exports.TEMP_USER_ID = 1;
exports.TOKEN_KEY = "df11cbd1-3916-4b54-b229-5b847dace2e9";
