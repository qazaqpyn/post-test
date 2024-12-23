import {AdapterParams, UnknownTx} from '@/adapter/types';
import {Prisma} from '@prisma/client';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
type Params = Pick<AdapterParams, 'db'>

export type Create = (data: Prisma.FeedbackPostCreateArgs, tx?: UnknownTx)=>Promise<IFeedbackPost | never>
export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).feedbackPost.create(data) as IFeedbackPost
  }
}
