export enum Status {
    Active = 1,
    NotActive = 2
}

export enum Roles {
    Aministrator = 1,
    UsualUser = 2
}

export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumericInput",
    InputParameterNotSupplied = "InputParameterSupplied",
    DeletionConflict = "DeletionConflict"
}