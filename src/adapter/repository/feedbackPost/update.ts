import {AdapterParams, UnknownTx} from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.FeedbackPostUpdateArgs, tx?: UnknownTx)=>Promise<IFeedbackPost | never>
export const buildUpdate = ({db}: Params): Update=>{
  return async (getParams, tx)=>{
    const user = await db.getContextClient(tx).feedbackPost.update(getParams) as IFeedbackPost
    
    return user
  }
}
