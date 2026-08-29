const TeamMember = require('../models/TeamMember');
const fs = require('fs');
const path = require('path');

// Helper to safely delete existing webp files on update/delete
const deleteImageFile = (photoPath) => {
  if (!photoPath) return;

  // Strip leading slash if present
  const cleanPath = photoPath.startsWith('/') ? photoPath.substring(1) : photoPath;
  const fullPath = path.join(process.cwd(), cleanPath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) console.error('Failed to delete image file:', unlinkErr);
      });
    }
  });
};

// GET: Fetch all members sorted by displayOrder
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Create team member
exports.createTeamMember = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ success: false, message: 'Profile photo is required.' });
    }

    // Uses req.file.relativePath if present, otherwise uses req.file.path or fallback
    const photoPath = req.file.relativePath || req.file.path || `/uploads/team/${req.file.filename}`;

    const newMember = new TeamMember({
      fullName: req.body.fullName,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      facebook: req.body.facebook || '',
      twitter: req.body.twitter || '',
      linkedin: req.body.linkedin || '',
      displayOrder: req.body.displayOrder ? Number(req.body.displayOrder) : 1,
      status: req.body.status || 'Active',
      photo: photoPath
    });

    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const existingMember = await TeamMember.findById(id);

    if (!existingMember) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }

    let photoPath = existingMember.photo;

    // Delete old image and set new path if new file uploaded
    if (req.file && req.file.filename) {
      deleteImageFile(existingMember.photo);
      photoPath = req.file.relativePath || req.file.path || `/uploads/team/${req.file.filename}`;
    }

    const updatedData = {
      fullName: req.body.fullName || existingMember.fullName,
      designation: req.body.designation || existingMember.designation,
      email: req.body.email || existingMember.email,
      phone: req.body.phone || existingMember.phone,
      facebook: req.body.facebook ?? existingMember.facebook,
      twitter: req.body.twitter ?? existingMember.twitter,
      linkedin: req.body.linkedin ?? existingMember.linkedin,
      displayOrder: req.body.displayOrder ? Number(req.body.displayOrder) : existingMember.displayOrder,
      status: req.body.status || existingMember.status,
      photo: photoPath
    };

    const updatedMember = await TeamMember.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE: Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);

    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }

    deleteImageFile(member.photo);
    await TeamMember.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Team member deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};