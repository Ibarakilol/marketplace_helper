import type { IApiToken, IApiUser } from '@/interfaces';

export const MOCK_API_USER: IApiUser = {
  id: '1',
  email: 'john.doe@example.com',
};

export const MOCK_API_TOKEN: IApiToken = {
  access_token: '1234567890',
  token_type: 'Bearer',
};
