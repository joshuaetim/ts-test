import { UserRequestModel, UserResponseModel } from "../../../../src/domain/user/models/user";
import { UserRepository } from "../../../../src/domain/user/interfaces/repositories/user-repo";
import { GetAllUsers } from "../../../../src/domain/user/use-cases/user/get-all-users";

describe("Get all users use case", () => {
    class MockUserRepository implements UserRepository {
        createUser(user: UserRequestModel): void {
            throw new Error("method not set yet");
        }
        getUsers(): Promise<UserResponseModel[]> {
            throw new Error("not implemented yet");
        }
    }
    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });

    test("expected data", async() => {
        const ResultExpected = [{id: "1", name: "Joshua"}];

        jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() => Promise.resolve(ResultExpected));
        const getAllUsersUse = new GetAllUsers(mockUserRepository);
        const result = getAllUsersUse.execute();
        expect(result).toStrictEqual(ResultExpected)
    })
});