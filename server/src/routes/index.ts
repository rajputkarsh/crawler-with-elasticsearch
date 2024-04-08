import { Router } from 'express';

import crawlerRouter from './v1/crawler.routes';
import clientsRouter from './v1/clients.routes';

const router = Router();


router.use('/crawler', crawlerRouter);
router.use('/clients', clientsRouter);

export default router;
