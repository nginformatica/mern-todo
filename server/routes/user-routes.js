import express from 'express';
import * as users from '../user-controller';

const router = new express.Router();

router.post('/', (req, res) => {
  users.create(req.body, res);
});

export default router;
