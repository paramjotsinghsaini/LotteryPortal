const connection = {
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lottery_portal',
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
module.exports = connection;
