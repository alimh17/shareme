"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { compare } from "bcrypt";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../../models/User/User"));
const Auth_Validation_1 = require("../../../utils/Vlidation/Auth-Validation");
const refreshToken_1 = __importDefault(require("../../../middlewares/refreshToken"));
const bcrypt_1 = require("../../../utils/bcrypt");
const loginController = async (req, res) => {
    try {
        const data = req.body;
        const { error, value } = Auth_Validation_1.loginSchema.validate(data);
        if (error) {
            return res.status(409).json({ message: error.details });
        }
        const user = await User_1.default.findOne({ email: value?.email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "کاربری با این مشخصات ثبت نشده است" });
        }
        const pass = await (0, bcrypt_1.Compare)(user.password, req.body.password);
        if (!pass) {
            return res
                .status(404)
                .json({ message: "کاربری با این مشخصات ثبت نشده است" });
        }
        const secret = process.env.SECRET_KEY;
        const access = jsonwebtoken_1.default.sign({ user }, secret, {
            expiresIn: "14d",
        });
        const refresh = (0, refreshToken_1.default)(user);
        const options = {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            signed: true, // Indicates if the cookie should be signed
        };
        res.cookie("user-shareme", { email: user.email }, options);
        res.status(200).json({ access, refresh, user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
        process.exit(1);
    }
};
exports.default = loginController;
