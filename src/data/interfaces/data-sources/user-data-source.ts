import { UserRequestModel, UserResponseModel } from "../../../domain/user/models/user";

export interface UserDataSource {
    create(user: UserRequestModel): void;
    getAll(): Promise<UserResponseModel[]>;
}