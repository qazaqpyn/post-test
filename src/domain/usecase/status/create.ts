import { UseCaseParams } from '@/domain/usecase/types';
import { IStatus } from '@/domain/entity/status';

export type CreateStatus = (params:{
 name: string 
}) => Promise<IStatus | never>

export const buildCreateStatus = ({ adapter }: UseCaseParams): CreateStatus=>{
  return async ({ name })=>{
    const status = await adapter.statusRepository.create({
      data: {
        name
      }
    });

    return status;
  };
};