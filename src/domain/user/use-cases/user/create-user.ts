import {UserRequestModel} from '../../models/user';
import {UserRepository} from '../../interfaces/repositories/user-repo';
import {CreateUserUseCase} from '../../interfaces/use-cases/create-user-uc';

export class CreateUser implements CreateUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(user: UserRequestModel) {
        await this.userRepository.createUser(user);
    }
}