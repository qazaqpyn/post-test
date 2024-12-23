import {AdapterParams} from '@/adapter/types';
import { IUpvote } from '@/domain/entity/Upvote';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type List = (params:Prisma.UpvoteFindManyArgs)=>Promise<Array<IUpvote> | never>
export const buildList = ({db}: Params): List=>{
  return async (getParams )=>{
    const user = await db.client.upvote.findMany(getParams) as Array<IUpvote>
    
    return user
  }
}
