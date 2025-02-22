import { doGet, doPost } from './axios-config';

import { mapApiToFeedback } from '@/adapters';
import { ApiRoute } from '@/constants';
import type { IApiFeedback, IFeedback, TApiResponse } from '@/interfaces';

export const fetchWbFeedbacks = async (): Promise<TApiResponse<IFeedback[]>> => {
  try {
    const { data } = await doGet<IApiFeedback[]>(ApiRoute.WB_FEEDBACKS);

    return { isSuccess: true, data: data.map(mapApiToFeedback) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchWbFeedback = async (feedbackId: string): Promise<TApiResponse<IFeedback>> => {
  try {
    const { data } = await doGet<IApiFeedback>(ApiRoute.WB_FEEDBACK(feedbackId));

    return { isSuccess: true, data: mapApiToFeedback(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchProcessWbFeedback = async (
  feedbackId: string,
  replyText: string
): Promise<TApiResponse> => {
  try {
    await doPost<IApiFeedback>(ApiRoute.WB_PROCESS_FEEDBACK, {
      feedback_id: feedbackId,
      reply: replyText,
    });

    return { isSuccess: true };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};
