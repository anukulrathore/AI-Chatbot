const express = require('express');
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const axios = require('axios');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

router.post('/send', auth, async (req, res) => {
  const { message } = req.body;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'google/gemma-3n-e4b-it:free',
      messages: [{ role: 'user', content: message }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const reply = response.data.choices[0].message.content;

  await Chat.create({
    userId: req.user.userId,
    messages: [
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    ]
  });

  res.json({ reply });
});

router.get('/history', auth, async (req, res) => {
  const chats = await Chat.find({ userId: req.user.userId }).sort('-createdAt');
  res.json(chats);
});

module.exports = router;
