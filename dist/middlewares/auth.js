"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedSuperUser = exports.getAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const database_1 = require("../database");
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const authenticatedReq = req;
    const token = (_b = (_a = authenticatedReq.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1]) === null || _b === void 0 ? void 0 : _b.trim();
    if (!token) {
        return res.status(403).json({
            message: 'Could not validate credentials',
        });
    }
    else {
        try {
            const tokenData = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (typeof tokenData === 'string') {
            }
            else {
                const { email } = tokenData;
                const user = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE email = ?`, [email]);
                if (user.length == 0) {
                    return res.status(404).json({
                        message: 'User not found',
                    });
                }
                else {
                    authenticatedReq.user = user[0];
                    next();
                }
            }
        }
        catch (error) {
            return res.status(403).json({
                message: 'Could not validate credentials',
            });
        }
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const getAuthenticatedSuperUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const authenticatedReq = req;
    const token = (_d = (_c = authenticatedReq.headers['authorization']) === null || _c === void 0 ? void 0 : _c.split('Bearer ')[1]) === null || _d === void 0 ? void 0 : _d.trim();
    if (!token) {
        return res.status(403).json({
            message: 'Could not validate credentials',
        });
    }
    else {
        try {
            const tokenData = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (typeof tokenData === 'string') {
            }
            else {
                const { email } = tokenData;
                const user = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE email = ?`, [email]);
                if (user.length == 0) {
                    return res.status(404).json({
                        message: 'User not found',
                    });
                }
                else {
                    if (user[0].is_superuser === false)
                        return res.status(403).json({
                            message: 'User does not have enough priviledges',
                        });
                    authenticatedReq.user = user[0];
                    next();
                }
            }
        }
        catch (error) {
            return res.status(403).json({
                message: 'Could not validate credentials',
            });
        }
    }
});
exports.getAuthenticatedSuperUser = getAuthenticatedSuperUser;
