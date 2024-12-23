import {AdapterParams, UnknownTx} from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.StatusUpdateArgs, tx?: UnknownTx)=>Promise<IStatus | never>
export const buildUpdate = ({db}: Params): Update=>{
  return async (getParams, tx)=>{
    const user = await db.getContextClient(tx).status.update(getParams) as IStatus
    
    return user
  }
}
