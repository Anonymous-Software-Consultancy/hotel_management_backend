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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.signin = exports.signup = void 0;
const database_1 = require("../database");
const auth_1 = require("../utils/auth");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, first_name, last_name, email, birth_date, phone, password } = req.body;
        const existingUserEmail = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE email = ?`, [email]);
        const existingUserUsername = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE username = ?`, [username]);
        if (existingUserEmail.length > 0)
            res.status(403).json('Email already in use');
        else if (existingUserUsername.length > 0)
            res.status(403).json('Username already in use');
        else {
            const hashedPassword = yield (0, auth_1.encryptPassword)(password);
            const sql = `
                INSERT INTO users
                (username, first_name, last_name, email, phone, birth_date, password, is_superuser)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [username, first_name, last_name, email, phone, birth_date, hashedPassword, false];
            const results = yield (0, database_1.dbHandler)(sql, values);
            res.status(201).json({
                username,
                first_name,
                last_name,
                email,
                phone,
                birth_date,
                id: results[0].insertId,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).json('Fields required for email and password');
            return;
        }
        const user = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE email = ?`, [email]);
        if (user.length == 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isVerified = yield (0, auth_1.comparePassword)(user[0].password, password);
        if (!isVerified) {
            res.status(403).json({ message: 'Incorrect password' });
            return;
        }
        else {
            const jwt = (0, auth_1.createToken)(user[0], 'ACCESS_TOKEN');
            res.status(200)
                .cookie('token', jwt, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            })
                .json({
                id: user[0].id,
                email: user[0].email,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.signin = signin;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, database_1.dbHandler)(`SELECT * FROM users WHERE id = ?`, [id]);
        const _a = user[0], { is_superuser, password } = _a, updatedUser = __rest(_a, ["is_superuser", "password"]); // excluded sensitive two fields
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getUserById = getUserById;
