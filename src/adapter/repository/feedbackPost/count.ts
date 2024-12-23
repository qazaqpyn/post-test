import {AdapterParams} from '@/adapter/types';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>

export type Count = (params: Prisma.FeedbackPostCountArgs)=>Promise<number | never>
export const buildCount = ({db}: Params): Count=>{
  return async (args)=>{
    const user = await db.client.feedbackPost.count(args)
    
    return user
  }
}
