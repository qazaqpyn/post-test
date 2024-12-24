import { UseCaseParams } from '@/domain/usecase/types';
import { IStatus } from '@/domain/entity/status';

export type DeleteStatus = (params:{
  statusId:string
}) => Promise<IStatus | never>

export const buildDeleteStatus = ({ adapter }: UseCaseParams): DeleteStatus=>{
  return async ({ statusId })=>{

    const status = await adapter.statusRepository.delete({
      where: {
        id: statusId
      }
    });

    return status;
  };
};