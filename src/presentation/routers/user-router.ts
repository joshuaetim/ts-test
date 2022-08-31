import express from 'express'
import { Request, Response } from 'express'
import {CreateUserUseCase} from '../../domain/interfaces/use-cases/create-user-uc'
import {GetAllUsersUseCase} from '../../domain/interfaces/use-cases/get-all-users-uc'

export default function UserRouter(
    getAllUsersUseCase: GetAllUsersUseCase,
    createUserUseCase: CreateUserUseCase
) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const users = await getAllUsersUseCase.execute();
            res.send(users);
        } catch (err: any) {
            console.log(err.message)
            res.status(500).send({message: "Error fetching data"});
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createUserUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({message: "Created"});
        } catch (err: any) {
            console.log(err.message);
            res.status(500).send({message: "Error saving data"});
        }
    })

    return router
}