const Message = require('../models/Message');

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
};

// Get a specific message by ID
const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving message', error: error.message });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { content, sender } = req.body;
  try {
    const newMessage = new Message({
      content,
      sender,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error: error.message });
  }
};

// Update a message
const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, { content }, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndRemove(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};