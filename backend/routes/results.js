const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const { auth, adminAuth } = require('../middleware/auth');

// Get all results (Admin only)
router.get('/', auth, adminAuth, resultsController.getAllResults);

// Get all results for a specific student
router.get('/:studentId', auth, resultsController.getResultsByStudent);

// Add a result (Admin only)
router.post('/', auth, adminAuth, resultsController.addResult);

// Update a result (Admin only)
router.put('/:id', auth, adminAuth, resultsController.updateResult);

// Delete a result (Admin only)
router.delete('/:id', auth, adminAuth, resultsController.deleteResult);

module.exports = router;
