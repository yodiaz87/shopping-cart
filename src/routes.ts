import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as ProductController from './controllers/product';
import * as OrderController from './controllers/order';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Product routes
router.post('/product/add', ProductController.add);
router.get('/product/all', ProductController.all);

// Order routes
router.post('/order/checkout', OrderController.checkout);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
