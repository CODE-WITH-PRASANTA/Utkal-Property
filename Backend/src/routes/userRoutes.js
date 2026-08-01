const express = require("express");

const router = express.Router();

const userController = require(
  "../controllers/userController"
);

const {
  userUpload,
  convertUserImageToWebp,
} = require(
  "../middleware/multer"
);

// ==========================================
// CREATE USER
// ==========================================

router.post(
  "/",
  userUpload.single("avatar"),
  convertUserImageToWebp,
  userController.createUser
);

// ==========================================
// GET ALL USERS
// ==========================================

router.get(
  "/",
  userController.getUsers
);

// ==========================================
// UPDATE STATUS
// Keep before /:id
// ==========================================

router.patch(
  "/:id/status",
  userController.updateUserStatus
);

// ==========================================
// GET SINGLE USER
// ==========================================

router.get(
  "/:id",
  userController.getUser
);

// ==========================================
// UPDATE USER
// ==========================================

router.put(
  "/:id",
  userUpload.single("avatar"),
  convertUserImageToWebp,
  userController.updateUser
);

// ==========================================
// DELETE USER
// ==========================================

router.delete(
  "/:id",
  userController.deleteUser
);

module.exports = router;