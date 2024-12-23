import {AdapterParams, UnknownTx} from '@/adapter/types';
import {Prisma} from '@prisma/client';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.FeedbackPostDeleteArgs, tx?: UnknownTx)=>Promise<IFeedbackPost | never>

export const buildDelete = ({db}: Params): Delete=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).feedbackPost.delete(data) as IFeedbackPost
  }
}
