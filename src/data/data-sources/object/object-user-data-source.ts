import { UserRequestModel, UserResponseModel } from "../../../domain/user/models/user";
import { UserDataSource } from "../../interfaces/data-sources/user-data-source";

export class ObjectUserDataSource implements UserDataSource {
    public users: UserResponseModel[];
    constructor(users: UserResponseModel[]) {
        this.users = users
    }
    async create(user: UserRequestModel) {
        this.users.push({
            id: '1',
            name: user.name
        })
    }
    async getAll(): Promise<UserResponseModel[]> {
        return this.users;
    }
}