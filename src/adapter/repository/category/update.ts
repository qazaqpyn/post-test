import {AdapterParams, UnknownTx} from '@/adapter/types';
import { ICategory } from '@/domain/entity/category';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.CategoryUpdateArgs, tx?: UnknownTx)=>Promise<ICategory | never>
export const buildUpdate = ({db}: Params): Update=>{
  return async (getParams, tx)=>{
    const user = await db.getContextClient(tx).category.update(getParams) as ICategory
    
    return user
  }
}
