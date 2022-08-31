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
const get_all_users_1 = require("../../../../src/domain/use-cases/user/get-all-users");
describe("Get all users use case", () => {
    class MockUserRepository {
        createUser(user) {
            throw new Error("method not set yet");
        }
        getUsers() {
            throw new Error("not implemented yet");
        }
    }
    let mockUserRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });
    test("expected data", () => __awaiter(void 0, void 0, void 0, function* () {
        const ResultExpected = [{ id: "1", name: "Joshua" }];
        jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() => Promise.resolve(ResultExpected));
        const getAllUsersUse = new get_all_users_1.GetAllUsers(mockUserRepository);
        const result = getAllUsersUse.execute();
        expect(result).toStrictEqual(ResultExpected);
    }));
});
