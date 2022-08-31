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
const create_user_1 = require("../../../../src/domain/use-cases/user/create-user");
describe("create a new contact use case", () => {
    class MockUserRepository {
        createUser(user) {
            throw new Error("not implemmented");
        }
        getUsers() {
            throw new Error("not implemented");
        }
    }
    let mockUserRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });
    test("should give value true", () => __awaiter(void 0, void 0, void 0, function* () {
        const Input = { id: "1", name: 'Joshua' };
        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true));
        const createUserUseCase = new create_user_1.CreateUser(mockUserRepository);
        const result = yield createUserUseCase.execute(Input);
        expect(mockUserRepository.createUser).toBeCalledTimes(1);
    }));
});
