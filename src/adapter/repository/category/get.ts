import { AdapterParams } from '@/adapter/types';
import { ICategory } from '@/domain/entity/category';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.CategoryFindFirstArgs)=>Promise<ICategory | null | never>
export const buildGet = ({ db }: Params): Get =>{
  return async (getParams)=>{
    const user = await db.client.category.findFirst(getParams) as ICategory | null;

    return user;
  };
};
