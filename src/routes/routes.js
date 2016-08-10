const express = require('express');
const taskService = require('../taskService');

const router = new express.Router();

router.get('/tasks/', (req, res) => {
  taskService.findByName(/* TODO */);
});

router.post('/tasks/', (req, res) => {
  taskService.save(req.body, res);
});

module.exports = router;
