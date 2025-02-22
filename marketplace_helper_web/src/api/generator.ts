import { doPost } from './axios-config';

import { ApiRoute } from '@/constants';
import type { IFeedback, TApiResponse } from '@/interfaces';

export const fetchGenerateReply = async (feedback: IFeedback): Promise<TApiResponse<string>> => {
  try {
    const { data } = await doPost<string>(ApiRoute.GENERATE_REPLY, feedback);

    return { isSuccess: true, data };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};
