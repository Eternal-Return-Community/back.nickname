import { Router } from 'express';
const router = Router();

import check from '../../routine/CheckAccount';

router.get("/:nickname", async (req, res) => {

  if (req.params.nickname.length < 2 || req.params.nickname.length > 16) {
    return res.json({
      error: true,
      message: "Nickname needs to be greater than 2 and less than 16 digits."
    });
  }

  if (req.params.nickname.match(/[~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\\/]/)) {
    return res.json({
      error: true,
      message: "invalid nickname"
    });
  }
  
  return res.json({
    result: await check(req.params.nickname)
  });
});

export default router;
