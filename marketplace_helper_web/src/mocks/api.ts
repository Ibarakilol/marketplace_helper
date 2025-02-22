import type { InternalAxiosRequestConfig } from 'axios';

import { MOCK_API_FEEDBACKS } from './feedbacks';
import { MOCK_API_TOKEN, MOCK_API_USER } from './users';

import { ApiResponseStatus, ApiRoute, RESPONSE_HEADERS_TOTAL_COUNT } from '@/constants';
import { parseJSON } from '@/utils';

const API_ROUTE_ID_REGEX = '([^/]+)';

export const getMockedApiResponse = ({
  data,
  method,
  url,
  params = {},
}: Required<InternalAxiosRequestConfig>) => {
  let requestPayload: any = {};

  if (data) {
    if (data instanceof FormData) {
      data.forEach((value, key) => {
        requestPayload[key] = parseJSON(value);
      });
    } else {
      requestPayload = JSON.parse(data);
    }
  }

  const mockedResponses: Record<string, Record<string, any>> = {
    get: {
      [ApiRoute.USERS_PROFILE]: () => {
        return { data: MOCK_API_USER };
      },
      [ApiRoute.WB_FEEDBACKS]: () => {
        const { limit = 5, offset = 0 } = params || {};
        const data = MOCK_API_FEEDBACKS;

        return {
          data: data.slice(offset, offset + limit),
          headers: { [RESPONSE_HEADERS_TOTAL_COUNT]: data.length },
        };
      },
    },
    post: {
      [ApiRoute.USERS_REGISTER]: () => {
        return { data: MOCK_API_TOKEN };
      },
      [ApiRoute.USERS_LOGIN]: () => {
        return { data: MOCK_API_TOKEN };
      },
      [ApiRoute.WB_PROCESS_FEEDBACK]: () => {
        const { feedback_id, reply } = requestPayload;

        return {
          data: MOCK_API_FEEDBACKS.map((feedback) =>
            feedback.id === feedback_id ? { ...feedback, reply } : feedback
          ),
        };
      },
      [ApiRoute.GENERATE_REPLY]: () => {
        const { name } = requestPayload;

        return { data: `Добрый день, ${name}! Спасибо за отзыв!` };
      },
    },
    patch: {
      [ApiRoute.USERS_PROFILE]: () => {
        const { wb_api_key, wb_supplier_name } = requestPayload;

        return { data: { ...MOCK_API_USER, wb_api_key, wb_supplier_name } };
      },
    },
  };

  let response = mockedResponses[method]?.[url];

  const matchRoute = (
    route: string,
    callback: (firstId: string, secondId: string) => { data?: any; status?: ApiResponseStatus }
  ) => {
    const match = url.match(new RegExp(`^${route}$`));

    if (match) {
      response = () => {
        const [, firstId, secondId] = match;
        return callback(firstId, secondId);
      };
    }
  };

  switch (method) {
    case 'get':
      matchRoute(ApiRoute.WB_FEEDBACK(API_ROUTE_ID_REGEX), (wbFeedbackId) => {
        return { data: MOCK_API_FEEDBACKS.find((feedback) => feedback.id === wbFeedbackId) };
      });

      break;
    default:
      break;
  }

  if (response) {
    return {
      status: ApiResponseStatus.SUCCESS,
      ...response(),
    };
  }
};
