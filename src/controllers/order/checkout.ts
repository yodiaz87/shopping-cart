import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';

/**
 * Using the money-math for the money operations,
 * I will assume the default currency but is open to use any.
*/
const money = require('money-math');

/**
 *  This solution is not the real life solution it is only to solve the problem and show others skills
 *  like unit tests with Jest and Supertest, error handling and validations with a middleware, API documentation with
 *  OpenAPI, logging with Winston, CI with Travis, Express, Typescript,etc.
 *
 *  TODO: Implement a better solution using a business
 *  rules library like https://www.npmjs.com/package/json-rules-engine
 *  or with a database table for the dynamic rules.
 */
const checkout: RequestHandler = async (req, res) => {
  const cartItems = req.body;

  const googleHomeSKU = '120P90';
  const macbookProSKU = '43N23P';
  const alexaSpeakerSKU = 'A304SD';
  const raspberryPiSKU = '234234';

  let total = '0.00';

  // Remove one Raspberry Pi for each MacBook Pro and calculate the price of the MacBook Pros
  if (macbookProSKU in cartItems && raspberryPiSKU in cartItems) {
    // Reduce Raspberry Pi amount for each macbook Pro
    cartItems[raspberryPiSKU]['quantity'] = cartItems[raspberryPiSKU].quantity - cartItems[macbookProSKU].quantity;

    const macbookTotalPrice = money.mul(`${cartItems[macbookProSKU].quantity.toString()}.00`, cartItems[macbookProSKU].price);
    total = money.add(total, macbookTotalPrice);
  }

  // Google Homes discount
  if (googleHomeSKU in cartItems) {
    if (cartItems[googleHomeSKU].quantity >= 3) {
      const priceOfTwo = money.mul(cartItems[googleHomeSKU].price, '2.00');
      const itemsWithRegularRate = cartItems[googleHomeSKU].quantity % 3;

      const itemsWithDiscountRate = (cartItems[googleHomeSKU].quantity - itemsWithRegularRate) / 3;

      const priceOfItemsWithDiscount = money.mul(`${itemsWithDiscountRate.toString()}.00`, priceOfTwo);

      const priceOfItemsWithRegularRate = money.mul(`${itemsWithRegularRate.toString()}.00`, cartItems[googleHomeSKU].price);

      const itemTotal = money.add(priceOfItemsWithDiscount, priceOfItemsWithRegularRate);
      total = money.add(total, itemTotal);
    } else {
      const priceOfItemsWithRegularRate = money.mul(`${cartItems[googleHomeSKU].quantity.toString()}.00`, cartItems[googleHomeSKU].price);
      total = money.add(total, priceOfItemsWithRegularRate);
    }
  }

  // Alexa Speaker discount
  if (alexaSpeakerSKU in cartItems) {
    // I will put >= here because in the Example Scenarios I see the discount applied when scanned 3 items,
    // but I have doubts because the statement says more than 3
    if (cartItems[alexaSpeakerSKU].quantity >= 3) {
      const discountPrice = money.percent(cartItems[alexaSpeakerSKU].price, '10.00');

      const newPrice = money.subtract(cartItems[alexaSpeakerSKU].price, discountPrice);

      const itemTotal = money.mul(`${cartItems[alexaSpeakerSKU].quantity.toString()}.00`, newPrice);

      total = money.add(total, itemTotal);
    } else {
      const priceOfItemsWithRegularRate = money.mul(`${cartItems[alexaSpeakerSKU].quantity.toString()}.00`, cartItems[alexaSpeakerSKU].price);
      total = money.add(total, priceOfItemsWithRegularRate);
    }
  }

  // Raspberry price
  if (raspberryPiSKU in cartItems) {
    const raspberryPiTotalPrice = money.mul(`${cartItems[raspberryPiSKU].quantity.toString()}.00`, cartItems[raspberryPiSKU].price);
    total = money.add(total, raspberryPiTotalPrice);
  }


  res.send({
    total
  });
};

export default requestMiddleware(checkout);
