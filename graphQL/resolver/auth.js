const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/Users");

const authResolver = {
  //Login user
  login: async (args) => {
    const { email, password } = args;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      //Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      //Return web token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      return { token: token };
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
};

module.exports = authResolver;
