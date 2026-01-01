import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import passport from "passport";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully."
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering user."
    });
  }
};

/* LOGIN (Passport Session) */
export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Login failed"
      });
    }

    // Create session and log user in
    req.logIn(user, (err) => {
      if (err) return next(err);
// console.log('Login successful:', user);
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  })(req, res, next);
};

/* LOGOUT (Destroy session) */
export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      // Clear cookie name should match your express-session cookie name
      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully."
      });
    });
  });
};

/* GET USER PROFILE */
export const getUserProfile = async (req, res) => {
  try {
    // Passport puts authenticated user on req.user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated."
      });
    }

    const userId = req.user._id;

    const user = await User.findById(userId)
      .select("-password") 
      .populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile."
    });
  }
};

/* UPDATE USER PROFILE */

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        //  extract public id of the old image from the url is it exists;
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteFromCloudinary(publicId);
        }

        //upload new photo to cloudinary
        const cloudRespone = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudRespone.secure_url;

        const updatedData = { name, photoUrl };
        
        const upddataUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: upddataUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            messge: "Something went wrong while updating profile."
        })
    }
}

