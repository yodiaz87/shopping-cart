import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IProduct extends Document {
  /** SKU of the product */
  sku: string;

  /** Name of the product */
  name: string;

  /** Price of the author */
  price: number;

  /** Quantity in Inventory */
  quantity: number;
}

interface IProductModel extends Model<IProduct> { }

const schema = new Schema({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Product: IProductModel = model<IProduct, IProductModel>('Product', schema);

export default Product;
