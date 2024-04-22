const { Users } = require("./userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const newUser = await Users(req.body);
    const result = await newUser.save();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.json("success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("Account not registered");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await Users.find();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await Users.findOne({ email });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.deleteOne({ _id: id });
    res.status(200).json({
      message: "user delete successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const makeUserToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const makeAdmin = await Users.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    if (!makeAdmin) {
      // If the user with the given ID is not found
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User role updated to admin successfully",
      user: makeAdmin,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const makeAdminToUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const makeAdmin = await Users.findByIdAndUpdate(
      userId,
      { role: "user" },
      { new: true }
    );

    if (!makeAdmin) {
      // If the user with the given ID is not found
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User role updated to admin successfully",
      user: makeAdmin,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const users = await Users.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const checkIfAdmin = async (req, res) => {
  try {
    const email = req.params.email;

    // Assuming you have defined your User model
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const result = { admin: user.role === "admin" };
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};






module.exports = {
  createUser,
  logInUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  makeUserToAdmin,
  makeAdminToUser,
  searchUsers,
  checkIfAdmin
};
