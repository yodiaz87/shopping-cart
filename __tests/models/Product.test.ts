import mockingoose from 'mockingoose';
import ProductModel from '../../src/models/Product';

describe('test mongoose Product model', () => {
  test('should return the doc with findById', () => {
    const returnValue = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      author: 'author'
    };

    mockingoose(ProductModel).toReturn(returnValue, 'findOne');

    return ProductModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnValue);
    });
  });
});
