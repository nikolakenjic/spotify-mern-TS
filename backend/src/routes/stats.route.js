import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Stats Route');
});

export default router;
