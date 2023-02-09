"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const User_1 = __importDefault(require("./routes/User"));
const Post_1 = __importDefault(require("./routes/Post"));
const Profile_1 = __importDefault(require("./routes/Profile"));
const Follow_1 = __importDefault(require("./routes/Follow"));
const Unfollow_1 = __importDefault(require("./routes/Unfollow"));
const IsFollow_1 = __importDefault(require("./routes/IsFollow"));
const MYK_1 = __importDefault(require("./routes/MYK"));
const path_1 = __importDefault(require("path"));
const DB_1 = __importDefault(require("./DB"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)("secret"));
//? -------------------- Statick Paths ----------------------------------
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
//? ---------------------- Routes -----------------------------------------
app.use("/v1/auth", Auth_1.default);
app.use("/v1/get-user", User_1.default);
app.use("/v1/post", Post_1.default);
app.use("/v1/profile", Profile_1.default);
app.use("/v1/follow", Follow_1.default);
app.use("/v1/unfollow", Unfollow_1.default);
app.use("/v1/isfollow", IsFollow_1.default);
app.use("/v1/myk", MYK_1.default);
//? --------------------- Connect To DataBase ---------------------------
(0, DB_1.default)(server);
