import { Sequelize, QueryTypes, Transaction } from 'sequelize';
import { UserRequestModel, UserResponseModel } from '../../../domain/user/models/user';
import { UserDataSource } from '../../interfaces/data-sources/user-data-source';
import User from './user-model';
const moment = require('moment');

// const sequelize = new Sequelize('sqlite::memory:');

export class SQLUserDataSource implements UserDataSource {
    sequelizeObject: Sequelize
    constructor(sequelizeObject: Sequelize) {
        this.sequelizeObject = sequelizeObject
    }

    async create(user: UserRequestModel) {
        let transaction;

        try {
            transaction = await this.sequelizeObject.transaction({
                isolationLevel: Transaction?.ISOLATION_LEVELS?.SERIALIZABLE,
            });
            const createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
            const updatedAt = createdAt;

            await this.sequelizeObject.query(
                `INSERT INTO users(name, createdAt, updatedAt) VALUES("${user.name}", "${createdAt}", "${updatedAt}")`,
                {
                    type: QueryTypes.INSERT,
                    transaction,
                }
            );

            await transaction.commit();
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAll(): Promise<UserResponseModel[]> {
        let transaction;

        try {
            transaction = await this.sequelizeObject.transaction({
                isolationLevel: Transaction?.ISOLATION_LEVELS?.SERIALIZABLE,
            });

            const users = await this.sequelizeObject.query(`SELECT * FROM users`, {
                type: QueryTypes.SELECT,
                transaction,
            });

            let data: UserResponseModel[] = [];
            users.forEach((user: any) => {
                data.push({
                    id: user?.id,
                    name: user?.name,
                });
            });
            await transaction.commit();

            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}