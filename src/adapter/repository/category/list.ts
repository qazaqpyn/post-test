import {AdapterParams} from '@/adapter/types';
import { ICategory } from '@/domain/entity/category';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type List = (params:Prisma.CategoryFindManyArgs)=>Promise<Array<ICategory> | never>
export const buildList = ({db}: Params): List=>{
  return async (getParams )=>{
    const user = await db.client.category.findMany(getParams) as Array<ICategory>
    
    return user
  }
}
