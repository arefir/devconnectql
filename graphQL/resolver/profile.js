const User = require("../../models/Users");
const Profile = require("../../models/Profile");

const profileResolver = {
  //Get All Profiles
  profiles: async (args) => {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar",
      ]);

      return profiles.map((profile) => {
        return {
          ...profile._doc,
          date: new Date(profile._doc.date).toISOString(),
        };
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  findProfile: async (args) => {
    try {
      const profile = await Profile.findOne({
        user: args.id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) throw new Error("Profile not found");
      return profile;
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        throw err("Profile not found");
      }
      throw err;
    }
  },

  //Create/Update a Profile
  createProfile: async (args, req) => {
    if (!req.isAuth) throw new Error("Not Authenticated");

    if (!args.profile_input.social) args.profile_input.social = {};

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      social: { youtube, twitter, instagram, linkedin, facebook },
    } = args.profile_input;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).populate("user", ["name", "avatar"]);
      } else {
        //Create Profile
        profile = new Profile(profileFields);
      }

      await profile.save();

      profile = await Profile.findOne({ user: req.user.id }).populate("user", [
        "name",
        "avatar",
      ]);

      profile = {
        ...profile._doc,
        date: new Date(profile._doc.date).toISOString(),
      };

      return profile;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  //Get Logged In User's Profile
  me: async (args, req) => {
    if (!req.isAuth) throw new Error("Not Authenticated");

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) throw new Error("No profile for this user.");

      profile = {
        ...profile._doc,
        date: new Date(profile._doc.date).toISOString(),
      };

      return profile;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  //Add Experience to Profile
  addExperience: async (args, req) => {
    if (!req.isAuth) throw new Error("Not Authenticated");

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = args.exp_input;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      profile.experience.unshift(newExp);

      await profile.save();

      profile = {
        ...profile._doc,
        date: new Date(profile._doc.date).toISOString(),
      };

      return profile;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  //Delete Experience
  deleteExperience: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Not Authenticated");

      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(args.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      return profile;
    } catch (error) {
      console.error(err.message);
      throw err;
    }
  },

  //Add Education to Profile
  addEducation: async (args, req) => {
    if (!req.isAuth) throw new Error("Not Authenticated");

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      graduated,
      description,
    } = args.ed_input;

    const newEd = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      graduated,
      description,
    };

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      profile.education.unshift(newEd);

      await profile.save();

      profile = {
        ...profile._doc,
        date: new Date(profile._doc.date).toISOString(),
      };

      return profile;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  //Delete Education
  deleteEducation: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Not Authenticated");

      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(args.ed_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      return profile;
    } catch (error) {
      console.error(err.message);
      throw err;
    }
  },
};

module.exports = profileResolver;
