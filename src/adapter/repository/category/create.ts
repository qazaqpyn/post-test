import {AdapterParams, UnknownTx} from '@/adapter/types';
import { ICategory } from '@/domain/entity/category';
import {Prisma} from '@prisma/client';
type Params = Pick<AdapterParams, 'db'>

export type Create = (data: Prisma.CategoryCreateArgs, tx?: UnknownTx)=>Promise<ICategory | never>
export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).category.create(data) as ICategory
  }
}
