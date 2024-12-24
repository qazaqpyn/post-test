import { UseCaseParams } from '@/domain/usecase/types';
import { IStatus } from '@/domain/entity/status';

export type UpdateStatus = (params:{
  statusId:string,
  name:string
}) => Promise<IStatus | never>

export const buildUpdateStatus = ({ adapter }: UseCaseParams): UpdateStatus=>{
  return async ({ statusId, name })=>{
    const status = await adapter.statusRepository.update({
      where: {
        id: statusId
      },
      data: {
        name
      }
    });

    return status;
  };
};