import request from 'supertest';
import app from '../../src/app';

describe('Checkout endpoint', () => {
  it('should calculate the price with the Google Home promotion', async () => {
    const res = await request(app)
      .post('/order/checkout')
      .send({
        '120P90': {
          sku: '120P90',
          name: 'Google Home',
          price: '49.99',
          quantity: 3
        }
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe('99.98');
  });

  it('should calculate the price with the Macbook Pro promotion', async () => {
    const res = await request(app)
      .post('/order/checkout')
      .send({
        '43N23P': {
          sku: '43N23P',
          name: 'MacBook Pro',
          price: '5,399.99',
          quantity: 1
        },
        234234: {
          sku: '234234',
          name: 'Raspberry PI B',
          price: '30.00',
          quantity: 1
        }
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe('5399.99');
  });

  it('should calculate Macbook Promotion when you add manually one more Raspberry Pi', async () => {
    const res = await request(app)
      .post('/order/checkout')
      .send({
        '43N23P': {
          sku: '43N23P',
          name: 'MacBook Pro',
          price: '5,399.99',
          quantity: 1
        },
        234234: {
          sku: '234234',
          name: 'Raspberry PI B',
          price: '30.00',
          quantity: 2
        }
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe('5429.99');
  });

  it('should calculate the price with the Alexa Speaker promotion (10% for each item)', async () => {
    const res = await request(app)
      .post('/order/checkout')
      .send({
        A304SD: {
          sku: 'A304SD',
          name: 'Alexa Speaker',
          price: '109.50',
          quantity: 3
        }
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe('295.65');
  });
});
