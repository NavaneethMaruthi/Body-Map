const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getLogs,
  createLog,
  deleteLog,
  getSummary,
} = require('../controllers/symptomController');

router.get('/',        auth, getLogs);
router.post('/',       auth, createLog);
router.delete('/:id',  auth, deleteLog);
router.get('/summary', auth, getSummary);

module.exports = router;