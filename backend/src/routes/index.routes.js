// Third Party Imports.
const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Local Imports.
const upload = require("../middlewares/files.middleware");
const User = require("../database/schemas/user.schema");
const auth = require("../middlewares/auth.middleware");

/**
 * @method - POST
 * @url - /user/signup
 * @description - User SignUp
 * @param - username, email, password, profilePicture
 * @response - token
 */
router.post(
  "/signup",
  upload.single("profilePicture"),
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Get Server URL.
    const url = req.protocol + "://" + req.get("host");

    // Check if there is a file.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Get data from request.
    const { username, email, password } = req.body;
    try {
      // Check if user exists.
      let user = await User.findOne({
        email,
      });
      // If user exists, return error.
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      // Create new user.
      user = new User({
        email,
        password,
        profilePicture: url + "/profileTemps/" + email.split("@")[0] + "/" + req.file.filename,
      });

      console.log(url + "/profileTemps/" + email.split("@")[0] + "/" + req.file.filename)

      // Salt and hash password.
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to database.
      await user.save();

      // Structure user data.
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create token and send it.
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      // Delete profilePicture if there is an error.
      if (req.file) {
        fs.unlink("./src/profileTemps/" + req.file.filename, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      // Return error.
      res.status(err.status || 500).json({
        message: err.message || "Something went wrong",
      });
    }
  }
);

/**
 * @method - POST
 * @url - /user/login
 * @description - User Login
 * @param - email, password
 * @response - token
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Check if there are errors.
    const errors = validationResult(req);

    // If there are errors, return them.
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Get data from request.
    const { email, password } = req.body;

    try {
      // Check if user exists.
      let user = await User.findOne({
        email,
      });

      // If user does not exist, return error.
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      // Check if password is correct.
      const isMatch = await bcrypt.compare(password, user.password);

      // If password is not correct, return error.
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      // Structure user data.
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create token and send it.
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: "3d",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  }
);

/**
 * @method - GET
 * @url - /user/me
 * @description - Get user data
 * @param - token
 * @response - user
 * @note - This route is protected by auth middleware.
 */
router.get("/get-session", auth, async (req, res) => {
  try {
    // Get user especific data.
    const user = await User.findById(req.user.id).select(
      "-password -createdAt -__v -_id"
    );
    // Return user data.
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
    });
  }
});

// Export.
module.exports = router;
