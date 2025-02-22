import type { IApiToken, IToken } from '@/interfaces';

export const mapApiToToken = ({ access_token, token_type }: IApiToken): IToken => {
  return {
    accessToken: access_token,
    tokenType: token_type,
  };
};
