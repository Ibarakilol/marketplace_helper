import { makeAutoObservable } from 'mobx';

import { fetchGenerateReply, fetchProcessWbFeedback, fetchWbFeedbacks } from '@/api';
import type { IFeedback } from '@/interfaces';

class WildberriesStore {
  isLoading: boolean = false;
  isProcessing: boolean = false;
  feedbacks: IFeedback[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsProcessing(isProcessing: boolean) {
    this.isProcessing = isProcessing;
  }

  setFeedbacks(feedbacks: IFeedback[]) {
    this.feedbacks = feedbacks;
  }

  async fetchFeedbacks() {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchWbFeedbacks();

    if (isSuccess) {
      this.setFeedbacks(data);
    }

    this.setIsLoading(false);
  }

  async processFeedbacks(feedbacks: IFeedback[]) {
    this.setIsProcessing(true);

    const feedbacksToProcess = feedbacks.filter((feedback) => !feedback.replyText);

    for await (const feedback of feedbacksToProcess) {
      const { data: replyText } = await fetchGenerateReply(feedback);

      if (replyText) {
        const { isSuccess } = await fetchProcessWbFeedback(feedback.feedbackId, replyText);

        if (isSuccess) {
          const updatedFeedbacks = this.feedbacks.map((item) =>
            item.feedbackId === feedback.feedbackId ? { ...item, replyText } : item
          );

          this.setFeedbacks(updatedFeedbacks);
        }
      }
    }

    this.setIsProcessing(false);
  }
}

export default new WildberriesStore();
