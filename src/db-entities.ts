export enum ColumnType {
    Integer = 1,
    Varchar,
    Boolean
}

export enum TableNames {
    User = "Users",
    Store = "Stores",
    Employee = "Employees"
}

export interface tableDefinition {
    name: string;
    fields: columnDefinition[];
}

export interface columnDefinition {
    dbName: string;
    name: string;
    type: ColumnType;
    isQueriable: boolean;
    isForOutput: boolean;
}