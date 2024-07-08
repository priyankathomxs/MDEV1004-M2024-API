"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let remoteUri = process.env.MONGO_URI;
let secret = process.env.APP_SECRET;
exports.default = {
    remoteUri: remoteUri,
    secret: secret,
};
//# sourceMappingURL=db.js.map