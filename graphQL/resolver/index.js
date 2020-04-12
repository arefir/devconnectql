const authResolver = require("./auth");
const usersResolver = require("./users");
const profileResolver = require("./profile");

const rootValue = {
  ...authResolver,
  ...usersResolver,
  ...profileResolver,
};

module.exports = rootValue;
