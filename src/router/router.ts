import { Router } from 'express';
const router = Router();

import index from './routes/index';
import check from './routes/check';
import list from './routes/list';

router.use('/', index);
router.use('/check/', check);
router.use('/list', list);

export default router;