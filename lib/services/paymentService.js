import { apiClient } from '../api/client';

export const paymentService = {
  createOrder: async ({ amount, currency = 'INR', receipt }) => {
    const response = await apiClient.post('/api/payments/create-order', {
      amount,
      currency,
      receipt,
    });
    return response;
  },
  verify: async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await apiClient.post('/api/payments/verify', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return response;
  },
};
