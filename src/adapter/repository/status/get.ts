import {AdapterParams} from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';
import {Prisma} from '@prisma/client'

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.StatusFindFirstArgs)=>Promise<IStatus | null | never>
export const buildGet = ({db}: Params): Get =>{
  return async (getParams )=>{
    const user = await db.client.status.findFirst(getParams) as IStatus | null

    return user
  }
}
