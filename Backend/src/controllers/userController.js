const User = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

// ==========================================
// CREATE USER
// POST /api/users
// ==========================================

exports.createUser = async (req, res) => {
  try {
    const {
      fullName,
      name,
      email,
      role,
      phone,
      password,
      status,
    } = req.body;

    const userName = fullName || name;

    // --------------------------------------
    // Validation
    // --------------------------------------

    if (!userName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    // --------------------------------------
    // Existing Email
    // --------------------------------------

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "A user with this email already exists.",
      });
    }

    // --------------------------------------
    // Hash Password
    // --------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // --------------------------------------
    // Avatar
    // --------------------------------------

    const avatar = req.file
      ? `/uploads/users/${req.file.filename}`
      : "";

    // --------------------------------------
    // Create
    // --------------------------------------

    const user = await User.create({
      name: userName.trim(),

      email: email.trim().toLowerCase(),

      role,

      phone: phone?.trim() || "",

      status: status || "Active",

      password: hashedPassword,

      avatar,
    });

    // Do not return password
    const safeUser = await User.findById(
      user._id
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: safeUser,
    });
  } catch (error) {
    console.error(
      "CREATE USER ERROR:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET USERS
// GET /api/users
// ==========================================

exports.getUsers = async (req, res) => {
  try {
    const {
      search = "",
      role = "All",
      status = "All",
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    // --------------------------------------
    // Search
    // --------------------------------------

    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // --------------------------------------
    // Role
    // --------------------------------------

    if (role && role !== "All") {
      query.role = role;
    }

    // --------------------------------------
    // Status
    // --------------------------------------

    if (status && status !== "All") {
      query.status = status;
    }

    const pageNumber = Math.max(
      Number(page) || 1,
      1
    );

    const pageLimit = Math.max(
      Number(limit) || 5,
      1
    );

    const skip =
      (pageNumber - 1) * pageLimit;

    const [users, total] =
      await Promise.all([
        User.find(query)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(pageLimit),

        User.countDocuments(query),
      ]);

    return res.status(200).json({
      success: true,

      users,

      pagination: {
        total,

        page: pageNumber,

        limit: pageLimit,

        totalPages:
          Math.ceil(total / pageLimit),
      },
    });
  } catch (error) {
    console.error(
      "GET USERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE USER
// GET /api/users/:id
// ==========================================

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "GET USER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE USER
// PUT /api/users/:id
// ==========================================

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const {
      fullName,
      name,
      email,
      role,
      phone,
      password,
      status,
    } = req.body;

    const userName =
      fullName || name;

    // --------------------------------------
    // Name
    // --------------------------------------

    if (userName !== undefined) {
      user.name = userName.trim();
    }

    // --------------------------------------
    // Email
    // --------------------------------------

    if (email !== undefined) {
      const normalizedEmail =
        email.trim().toLowerCase();

      const emailExists =
        await User.findOne({
          email: normalizedEmail,

          _id: {
            $ne: user._id,
          },
        });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message:
            "Email already used by another user.",
        });
      }

      user.email = normalizedEmail;
    }

    // --------------------------------------
    // Role
    // --------------------------------------

    if (role !== undefined) {
      user.role = role;
    }

    // --------------------------------------
    // Phone
    // --------------------------------------

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    // --------------------------------------
    // Status
    // --------------------------------------

    if (status !== undefined) {
      user.status = status;
    }

    // --------------------------------------
    // Password
    // Empty password = keep existing
    // --------------------------------------

    if (
      password &&
      password.trim() !== ""
    ) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters.",
        });
      }

      user.password = await bcrypt.hash(
        password,
        10
      );
    }

    // --------------------------------------
    // New Avatar
    // --------------------------------------

    if (req.file) {
      // Delete old local avatar
      if (
        user.avatar &&
        user.avatar.startsWith(
          "/uploads/users/"
        )
      ) {
        const oldAvatarPath = path.join(
          __dirname,
          "../..",
          user.avatar.replace(/^\//, "")
        );

        if (fs.existsSync(oldAvatarPath)) {
          await fs.promises.unlink(
            oldAvatarPath
          );
        }
      }

      user.avatar =
        `/uploads/users/${req.file.filename}`;
    }

    await user.save();

    const safeUser =
      await User.findById(user._id);

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: safeUser,
    });
  } catch (error) {
    console.error(
      "UPDATE USER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE STATUS
// PATCH /api/users/:id/status
// ==========================================

exports.updateUserStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (
      !["Active", "Inactive"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be Active or Inactive.",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "User status updated successfully.",
      user,
    });
  } catch (error) {
    console.error(
      "STATUS UPDATE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE USER
// DELETE /api/users/:id
// ==========================================

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // --------------------------------------
    // Delete avatar
    // --------------------------------------

    if (
      user.avatar &&
      user.avatar.startsWith(
        "/uploads/users/"
      )
    ) {
      const avatarPath = path.join(
        __dirname,
        "../..",
        user.avatar.replace(/^\//, "")
      );

      if (fs.existsSync(avatarPath)) {
        await fs.promises.unlink(
          avatarPath
        );
      }
    }

    // --------------------------------------
    // Delete DB record
    // --------------------------------------

    await User.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE USER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};