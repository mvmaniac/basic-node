const express = require('express');

const router = express.Router();

// GET /view 라우터
router.get('/', (_req, res) => {
  res.render('view', { title: 'Express' });
});

module.exports = router;
