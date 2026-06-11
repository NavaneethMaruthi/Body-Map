const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://localhost:11434' });

router.post('/', auth, async (req, res) => {
  const { bodyRegion, severity, category, notes } = req.body;

  const prompt = `You are a helpful medical assistant. A user has logged the following symptom:
- Body Region: ${bodyRegion.replace(/_/g, ' ')}
- Severity: ${severity}/10
- Category: ${category}
- Notes: ${notes || 'None provided'}

Please provide a brief response with exactly 3 sections:
1. **What it might be**: 2-3 possible causes (keep it short)
2. **Why it happened**: 2-3 common reasons (keep it short)
3. **What to do**: 3-4 practical steps they can take

Keep the entire response concise and easy to read. End with a one-line disclaimer that this is not medical advice.`;

  try {
    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ insight: response.message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'AI service unavailable', error: err.message });
  }
});

module.exports = router;