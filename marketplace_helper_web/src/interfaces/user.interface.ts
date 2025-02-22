export interface IApiUser {
  id: string;
  email: string;
  wb_supplier_name?: string;
}

export interface IUser {
  id: string;
  email: string;
  wbSupplierName?: string;
}

export interface IApiUserUpdate {
  wb_api_key?: string;
  wb_supplier_name?: string;
}

export interface IUserUpdate {
  wbApiKey?: string;
  wbSupplierName?: string;
}

export interface IUserAuth {
  email: string;
  password: string;
}

export interface IApiToken {
  access_token: string;
  token_type: string;
}

export interface IToken {
  accessToken: string;
  tokenType: string;
}
