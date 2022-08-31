import { UserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { UserRequestModel, UserResponseModel } from "../models/user";
import { UserRepository } from "../interfaces/repositories/user-repo";

export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource;
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }

    async getUsers(): Promise<UserResponseModel[]> {
        return this.userDataSource.getAll()
    }

    async createUser(user: UserRequestModel) {
        this.userDataSource.create(user)
    }
}