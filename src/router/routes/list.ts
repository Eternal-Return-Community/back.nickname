import { Router } from 'express';
import list from '../../database/operations/list';
const router = Router();

router.get("/", async (req, res) => {

  const size = Number(req.query.size) ? Number(req.query.size) : 1;
  return res.json({
    result: await list(size)
  });
});

export default router;