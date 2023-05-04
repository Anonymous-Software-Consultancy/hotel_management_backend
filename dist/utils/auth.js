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
exports.encryptPassword = exports.comparePassword = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const saltRounds = 10;
const createToken = (user, type) => {
    switch (type) {
        case 'ACCESS_TOKEN':
            return jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '7d' });
        case 'REFRESH_TOKEN':
            break;
        default:
            break;
    }
};
exports.createToken = createToken;
const comparePassword = (hashedPassword, plainPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.compare(plainPassword, hashedPassword); });
exports.comparePassword = comparePassword;
const encryptPassword = (plainPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.hash(plainPassword, saltRounds); });
exports.encryptPassword = encryptPassword;
