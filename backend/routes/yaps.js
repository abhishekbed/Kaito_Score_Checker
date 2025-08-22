const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(`https://api.kaito.ai/api/v1/yaps`, {
      params: { username }
    });

    const data = response.data;
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YAPS score', details: error.message });
  }
});

module.exports = router;
