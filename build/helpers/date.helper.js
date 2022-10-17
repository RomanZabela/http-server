"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static dateToString(input) {
        const year = input.getFullYear().toString();
        const month = (input.getMonth() + 1).toString().padStart(2, "0");
        const day = (input.getDay()).toString().padStart(2, "0");
        const hour = (input.getHours()).toString().padStart(2, "0");
        const minute = (input.getMinutes()).toString().padStart(2, "0");
        const second = (input.getSeconds()).toString().padStart(2, "0");
        return `${year}${month}${day} ${hour}${minute}${second}`;
    }
}
exports.DateHelper = DateHelper;
