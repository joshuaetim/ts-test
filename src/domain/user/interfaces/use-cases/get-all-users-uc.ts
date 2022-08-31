import {UserResponseModel} from '../../models/user'

export interface GetAllUsersUseCase {
    execute(): Promise<UserResponseModel[]>;
}