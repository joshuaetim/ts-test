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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLUserDataSource = void 0;
const sequelize_1 = require("sequelize");
const moment = require('moment');
// const sequelize = new Sequelize('sqlite::memory:');
class SQLUserDataSource {
    constructor(sequelizeObject) {
        this.sequelizeObject = sequelizeObject;
    }
    create(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield this.sequelizeObject.transaction({
                    isolationLevel: (_a = sequelize_1.Transaction === null || sequelize_1.Transaction === void 0 ? void 0 : sequelize_1.Transaction.ISOLATION_LEVELS) === null || _a === void 0 ? void 0 : _a.SERIALIZABLE,
                });
                const createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
                const updatedAt = createdAt;
                yield this.sequelizeObject.query(`INSERT INTO users(name, createdAt, updatedAt) VALUES("${user.name}", "${createdAt}", "${updatedAt}")`, {
                    type: sequelize_1.QueryTypes.INSERT,
                    transaction,
                });
                yield transaction.commit();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield this.sequelizeObject.transaction({
                    isolationLevel: (_a = sequelize_1.Transaction === null || sequelize_1.Transaction === void 0 ? void 0 : sequelize_1.Transaction.ISOLATION_LEVELS) === null || _a === void 0 ? void 0 : _a.SERIALIZABLE,
                });
                const users = yield this.sequelizeObject.query(`SELECT * FROM users`, {
                    type: sequelize_1.QueryTypes.SELECT,
                    transaction,
                });
                let data = [];
                users.forEach((user) => {
                    data.push({
                        id: user === null || user === void 0 ? void 0 : user.id,
                        name: user === null || user === void 0 ? void 0 : user.name,
                    });
                });
                yield transaction.commit();
                return data;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.SQLUserDataSource = SQLUserDataSource;
