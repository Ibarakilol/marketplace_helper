export interface IApiFeedback {
  id: string;
  feedback_id: string;
  sku: number;
  product_name: string;
  product_valuation: number;
  name: string;
  reply_text?: string;
  text: string;
  with_photo: boolean;
}

export interface IFeedback {
  id: string;
  feedbackId: string;
  sku: string;
  productName: string;
  productValuation: number;
  name: string;
  replyText?: string;
  text: string;
  withPhoto: boolean;
}
