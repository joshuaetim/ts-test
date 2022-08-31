import {UserResponseModel} from '../../models/user';
import { UserRepository } from '../../interfaces/repositories/user-repo';
import { GetAllUsersUseCase } from '../../interfaces/use-cases/get-all-users-uc';

export class GetAllUsers implements GetAllUsersUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(): Promise<UserResponseModel[]> {
        const result = await this.userRepository.getUsers()
        return result
    }
}