const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');
const { upload, convertToWebp } = require('../middleware/multer');

router.get('/', teamController.getTeamMembers);
router.post('/', upload.single('photo'), convertToWebp, teamController.createTeamMember);
router.put('/:id', upload.single('photo'), convertToWebp, teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;