"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./libs/database");
const prof_1 = __importDefault(require("./routes/prof"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
app.use("/undergraduate_student", prof_1.default);
dotenv_1.default.config();
(0, database_1.connectToDatabase)();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));
//passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
});
const PORT = process.env.MAIN_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
