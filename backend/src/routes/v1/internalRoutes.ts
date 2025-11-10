/**
 * @summary Internal API routes configuration
 * @module routes/v1/internal
 */

import { Router } from 'express';

const router = Router();

/**
 * @summary Placeholder for internal routes
 */
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: 'v1', type: 'internal' });
});

export default router;
