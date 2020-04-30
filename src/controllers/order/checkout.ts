import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import { IProduct } from '../../models/Product';

const checkout: RequestHandler = async (req, res) => {
  const cartItems: IProduct[] = req.body;

  res.send({
    total: 23

  });
};

export default requestMiddleware(checkout);
