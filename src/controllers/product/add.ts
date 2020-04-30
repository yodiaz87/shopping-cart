import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

export const addProductSchema = Joi.object().keys({
  sku: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    sku,
    name,
    price,
    quantity
  } = req.body;

  const product = new Product({
    sku,
    name,
    price,
    quantity
  });

  await product.save();

  res.send({
    message: 'Saved',
    product: product.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addProductSchema } });
