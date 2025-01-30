// import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
// import config from '../../config';

// const shurjopay = new Shurjopay();

// shurjopay.config(
//   config.sp.sp_endpoint!,
//   config.sp.sp_username!,
//   config.sp.sp_password!,
//   config.sp.sp_prefix!,
//   config.sp.sp_return_url!,
// );

// const makePaymentAsync = async (
//   paymentPayload: PaymentRequest & { prefix: string; token: string; return_url: string; cancel_url: string; [key: string]: any },
// ): Promise<PaymentResponse> => {
//   return new Promise((resolve, reject) => {
//     shurjopay.makePayment(
//       paymentPayload,
//       (response: PaymentResponse) => resolve(response),
//       (error: Error) => reject(error),
//     );
//   });
// };

// const verifyPaymentAsync = (
//   order_id: string,
// ): Promise<VerificationResponse[]> => {
//   return new Promise((resolve, reject) => {
//     shurjopay.verifyPayment(
//       order_id,
//       (response: VerificationResponse[]) => resolve(response),
//       (error: Error) => reject(error),
//     );
//   });
// };

// export const orderUtils = {
//   makePaymentAsync,
//   verifyPaymentAsync,
// };
