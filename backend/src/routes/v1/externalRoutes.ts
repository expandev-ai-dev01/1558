/**
 * @summary External API routes configuration
 * @module routes/v1/external
 */

import { Router } from 'express';

const router = Router();

/**
 * @summary Health check endpoint for external monitoring
 */
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: 'v1' });
});

export default router;
