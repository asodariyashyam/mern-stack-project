const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_model = require("../models/user_model");
const errorHandler = require("../utils/error.js");
const listing_model = require("../models/listing_model.js");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new user_model({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await user_model.findOne({ email });
    if (!checkEmail) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, checkEmail.password);
    if (!validPassword) {
      return next(errorHandler(401, "Password is not valid!"));
    }
    const token = jwt.sign({id:checkEmail._id},"shyam");

    const { password: pass, ...rest } = checkEmail._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(checkEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.google = async (req, res, next) => {
  try {
    const user = await user_model.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, "shyam");

      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new user_model({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "shyam");

      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.avatar) updateData.avatar = req.body.avatar;

    if (req.body.password) {
      if (!req.body.password.trim()) {
        return next(errorHandler(400, "Password cannot be empty"));
      }
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await user_model.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    next(errorHandler(500, "Internal Server Error"));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await user_model.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted !!");
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

exports.getUserListing = async (req, res, next) => {
  try {
    if (req.params.id) {
      const listings = await listing_model.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      return next(errorHandler(401, "You can only view your own listing!"));
    }
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

exports.signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({
      success: true,
      message: "User has been logged out!"
    });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await user_model.findById(req.params.id)
    if(!user){
      return next(errorHandler(404, "User not found"))
    }
    const {password:pass, ...rest} =user._doc;
    res.status(200).json(rest)
  }catch(error){
    next(error);
  }
};
