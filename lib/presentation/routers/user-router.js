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
const express_1 = __importDefault(require("express"));
function UserRouter(getAllUsersUseCase, createUserUseCase) {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield getAllUsersUseCase.execute();
            res.send(users);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error fetching data" });
        }
    }));
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield createUserUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({ message: "Created" });
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    return router;
}
exports.default = UserRouter;
