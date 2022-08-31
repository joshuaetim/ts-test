require('dotenv').config()
import server from "./server";
import { SQLUserDataSource } from './data/data-sources/sql/user-source'
import UserRouter from './presentation/routers/user-router'
import { GetAllUsers } from "./domain/use-cases/user/get-all-users";
import { CreateUser } from "./domain/use-cases/user/create-user";
import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import {sequelize} from './setup/database/connection'
import dbInit from './setup/database/init'

dbInit()

async function getSQLDataSource() {
    return new SQLUserDataSource(sequelize)
}

(async () => {
    const dataSource = await getSQLDataSource();

    const userMiddleware = UserRouter(
        new GetAllUsers(new UserRepositoryImpl(dataSource)),
        new CreateUser(new UserRepositoryImpl(dataSource))
    )

    server.use("/users", userMiddleware)
    server.listen(4000, () => console.log("running on port 4000"))
})()