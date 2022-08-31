import { Sequelize }  from 'sequelize';
// let connection = null;
// connection = new Sequelize('sqlite::memory:');

function getConnection(): Sequelize {
  // return new Sequelize('sqlite::memory:');
  let connection = new Sequelize(process.env.DEV_DATABASE_NAME!, process.env.DEV_DATABASE_USER!, process.env.DEV_DATABASE_PASSWORD!, {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
  });
  return connection;
}

/* if (process.env.NODE_ENV === 'development') {
  connection = new Sequelize(process.env.mysql_local_database, process.env.mysql_local_user, process.env.mysql_local_password, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
  });
} else {
  connection = new Sequelize(process.env.databaseName, process.env.userName, process.env.password, {
    dialect: process.env.dialect,
    host: process.env.host,
    port: process.env.port,
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
  });
} */

export const sequelize = getConnection()
