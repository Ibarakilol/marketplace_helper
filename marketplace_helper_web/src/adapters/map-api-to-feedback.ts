import type { IApiFeedback, IFeedback } from '@/interfaces';

export const mapApiToFeedback = ({
  feedback_id,
  product_name,
  product_valuation,
  with_photo,
  ...rest
}: IApiFeedback): IFeedback => {
  return {
    ...rest,
    feedbackId: feedback_id,
    productName: product_name,
    productValuation: product_valuation,
    withPhoto: with_photo,
  };
};
