const express = require('express');
const router = express.Router();
const messageController = require('../controllers/Message');
const { ensureAuthenticated } = require('../middleware/auth');

// Message routes
router.get('/messages', ensureAuthenticated, messageController.getAllMessages);
router.get('/messages/:id', ensureAuthenticated, messageController.getMessageById);
router.post('/messages', ensureAuthenticated, messageController.createMessage);
router.put('/messages/:id', ensureAuthenticated, messageController.updateMessage);
router.delete('/messages/:id', ensureAuthenticated, messageController.deleteMessage);

module.exports = router;