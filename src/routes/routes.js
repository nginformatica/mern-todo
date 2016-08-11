const express = require('express');
const taskService = require('../taskService');

const router = new express.Router();

router.get('/tasks/:id', (req, res) => {
  taskService.find(req.params.id, res);
});

router.get('/tasks/find/:summary', (req, res) => {
  taskService.findBySummary(req.params.summary, res);
});

router.post('/tasks/', (req, res) => {
  taskService.save(req.body, res);
});

module.exports = router;
