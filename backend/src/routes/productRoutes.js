import express from 'express';
import {
  healthCheck,
  getProducts,
  getProductBySlug,
  getEMIPlansBySlug,
} from '../controllers/productController.js';

const router = express.Router();

// Health Check
router.get('/health', healthCheck);

// Products endpoints
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/products/:slug/emi-plans', getEMIPlansBySlug);

export default router;
