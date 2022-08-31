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
require('dotenv').config();
const server_1 = __importDefault(require("./server"));
const user_source_1 = require("./data/data-sources/sql/user-source");
const user_router_1 = __importDefault(require("./presentation/routers/user-router"));
const get_all_users_1 = require("./domain/user/use-cases/user/get-all-users");
const create_user_1 = require("./domain/user/use-cases/user/create-user");
const user_repository_1 = require("./domain/user/repositories/user-repository");
const connection_1 = require("./setup/database/connection");
const init_1 = __importDefault(require("./setup/database/init"));
(0, init_1.default)();
function getSQLDataSource() {
    return __awaiter(this, void 0, void 0, function* () {
        return new user_source_1.SQLUserDataSource(connection_1.sequelize);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield getSQLDataSource();
    const userMiddleware = (0, user_router_1.default)(new get_all_users_1.GetAllUsers(new user_repository_1.UserRepositoryImpl(dataSource)), new create_user_1.CreateUser(new user_repository_1.UserRepositoryImpl(dataSource)));
    server_1.default.use("/users", userMiddleware);
    server_1.default.listen(4000, () => console.log("running on port 4000"));
}))();
