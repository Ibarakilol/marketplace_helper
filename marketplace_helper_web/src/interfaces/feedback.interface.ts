export interface IApiFeedback {
  feedback_id: string;
  sku: number;
  product_name: string;
  product_valuation: number;
  name: string;
  text: string;
  with_photo: boolean;
}

export interface IFeedback {
  feedbackId: string;
  sku: number;
  productName: string;
  productValuation: number;
  name: string;
  text: string;
  withPhoto: boolean;
}
