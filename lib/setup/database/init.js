"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../data/data-sources/sql/user-model"));
const dbInit = () => {
    user_model_1.default.sync({ alter: true });
};
exports.default = dbInit;
