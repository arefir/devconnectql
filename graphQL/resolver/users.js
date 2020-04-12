const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/Users");

const usersResolver = {
  //Register User
  createUser: async (args) => {
    try {
      // see if user exists
      const { name, email, password } = args.userinput;

      let user = await User.findOne({ email });

      if (user) throw new Error("User already exists");

      //Get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      user.password = null;
      return user;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
};

module.exports = usersResolver;
