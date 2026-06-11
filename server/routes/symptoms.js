const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const {
  getLogs,
  createLog,
  deleteLog,
  getSummary,
  updateLog,
} = require('../controllers/symptomController');

router.get('/',        auth, getLogs);
router.post('/',       auth, createLog);
router.delete('/:id',  auth, deleteLog);
router.get('/summary', auth, getSummary);
router.put('/:id',     auth, updateLog);

module.exports = router;