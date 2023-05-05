"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOnFormat = void 0;
const sendOnFormat = (data, success, status, message, extra) => {
    return {
        data: data,
        success: true,
        status: status,
        message: message,
        extra: extra,
    };
};
exports.sendOnFormat = sendOnFormat;
