const express = require('express');
const tasks = require('../tasks');

const router = new express.Router();

router.get('/tasks', (req, res) => {
  tasks.findAll(res);
});

router.get('/tasks/:id', (req, res) => {
  tasks.findById(req.params.id, res);
});

router.get('/tasks/find/:summary', (req, res) => {
  tasks.findBySummary(req.params.summary, res);
});

router.post('/tasks/', (req, res) => {
  tasks.save(req.body, res);
});

router.put('/tasks/', (req, res) => {
  tasks.update(req.body, res);
});

router.delete('/tasks/:id', (req, res) => {
  tasks.delete(req.params.id, res);
});

module.exports = router;
