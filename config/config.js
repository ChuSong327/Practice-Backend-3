const environment = process.env.NODE_ENV || "development";
const connectionUrl = {
    development: {
        connection: "mongodb://localhost:27017/todo"
    },
    production: {
        connection: process.env.DATABASE_URL
    }
};

module.exports = connectionUrl[environment];