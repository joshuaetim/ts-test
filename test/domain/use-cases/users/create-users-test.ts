import { UserRequestModel, UserResponseModel } from "../../../../src/domain/models/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repo";
import { CreateUser } from "../../../../src/domain/use-cases/user/create-user";

describe("create a new contact use case", () => {
    class MockUserRepository implements UserRepository {
        createUser(user: UserRequestModel): void {
            throw new Error("not implemmented");
        }
        getUsers(): Promise<UserResponseModel[]> {
            throw new Error("not implemented");
        }
    }
    
    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository()
    }); 

    test("should give value true", async () => {
        const Input = {id: "1", name: 'Joshua'};

        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true));
        const createUserUseCase = new CreateUser(mockUserRepository)
        const result = await createUserUseCase.execute(Input);
        expect(mockUserRepository.createUser).toBeCalledTimes(1);
    })
});