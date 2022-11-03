import { map, filter } from "underscore";
import { columnDefinition, tableDefinition } from "../db-entities";
import { SQLHelper } from "./sql.helper";

interface IDbTable<T> {
    instanceGenericType: T;
    getById<T>(id: number): Promise<T>;
}

export class DbTable<T> implements IDbTable<T> {
    private _table: tableDefinition;
    private _instanceGenericType: T;

    constructor(
        table: tableDefinition
    ){
        this._table = table;
        this._instanceGenericType = {} as T;
    }

    public get instanceGenericType(): T{
        return this._instanceGenericType;
    };

    public async getById<T>(id: number): Promise<T> {
        let queriedFields: string = map(filter(this._table.fields, (column: columnDefinition) => column.isForOutput), (column: columnDefinition) => column.dbName).join(", ");
        let sql: string = `SELECT ${queriedFields} FROM ${this._table.name} WHERE User_id = ?`;

        const result: T = await SQLHelper.executeQuerySingle<T>(sql, id)

        this._table.fields.forEach((column: columnDefinition) => {
            if (column.name !== column.dbName) {
                (result as any)[column.name] = (result as any)[column.dbName];
                delete (result as any)[column.dbName];
            }
        });

        return result;
    }
}