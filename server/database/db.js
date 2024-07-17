const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("realestate", "root", "dali1234", {
  host: "localhost",
  dialect: "mysql",
});


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, testConnection };
