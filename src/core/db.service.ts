import { columnDefinition, ColumnType, tableDefinition, TableNames } from "../db-entities";
import { DbTable } from "./db-table.service";
import * as _ from "underscore";
import { Stores, user } from "../entities";

interface localTable<T> {
    table: tableDefinition;
    instance: DbTable<T>;
}

interface IDbService {
    getFromTableById(tableName: TableNames, id: number): Promise<any>;
}

class DbService implements IDbService {

    private _tables: _.Dictionary<any> = {};

    constructor() {
        this._tables[TableNames.User] = this.addTableToContext<user>(TableNames.User, [{
            dbName: "ID",
            name: "ID",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true
        }, {
            dbName: "User_login",
            name: "login",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true
        },{
            dbName: "User_Employee_ID",
            name: "user_Employee_ID",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true
        }]);
        
        this._tables[TableNames.Store] = this.addTableToContext<Stores>(TableNames.Store, [{
            dbName: "ID",
            name: "ID",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true
        }, {
            dbName: "Store_Name",
            name: "storeName",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true
        },{
            dbName: "Store_Address",
            name: "storeAddress",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true
        },{
            dbName: "Store_Capacity",
            name: "storeCapacity",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true
        }]);
    }

    public get tables(): _.Dictionary<tableDefinition> {
        return this._tables;
    }

    public async getFromTableById(tableName: TableNames, id: number): Promise<any> {
        const dbTableObject: localTable<any> = this._tables[tableName] as localTable<any>;

        return await dbTableObject.instance.getById(id);
    }

    private addTableToContext<T>(tableName: TableNames, fields: columnDefinition[]): localTable<T> {
        let tableDefinition: tableDefinition = {
            name: tableName,
            fields: fields
        };

        let tableInstance: DbTable<T> = new DbTable(tableDefinition);

        let table: localTable<T> = {
            table: tableDefinition,
            instance: tableInstance
        };

        return table;
    }
}

export default new DbService();