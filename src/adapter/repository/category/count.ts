import {AdapterParams} from '@/adapter/types';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>

export type Count = (params: Prisma.CategoryCountArgs)=>Promise<number | never>
export const buildCount = ({db}: Params): Count=>{
  return async (args)=>{
    const user = await db.client.category.count(args)
    
    return user
  }
}
