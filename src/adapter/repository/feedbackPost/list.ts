import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type List = (params:Prisma.FeedbackPostFindManyArgs)=>Promise<Array<IFeedbackPost> | never>
export const buildList = ({db}: Params): List=>{
  return async (getParams )=>{
    const user = await db.client.feedbackPost.findMany(getParams) as Array<IFeedbackPost>
    
    return user
  }
}
