import type { IApiUserUpdate, IUserUpdate } from '@/interfaces';

export const mapUserToApi = ({ wbApiKey, wbSupplierName }: IUserUpdate): IApiUserUpdate => {
  return {
    ...(wbApiKey && { wb_api_key: wbApiKey }),
    ...(wbSupplierName && { wb_supplier_name: wbSupplierName }),
  };
};
