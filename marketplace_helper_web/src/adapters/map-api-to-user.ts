import type { IApiUser, IUser } from '@/interfaces';

export const mapApiToUser = ({ wb_supplier_name, ...rest }: IApiUser): IUser => {
  return {
    ...rest,
    wbSupplierName: wb_supplier_name,
  };
};
