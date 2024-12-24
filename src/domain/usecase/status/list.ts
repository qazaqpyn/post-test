import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IStatus } from '@/domain/entity/status';

export type GetStatusList = () =>
    Promise<IStatus[] | never>
export const buildGetStatusList = ({ adapter }: UseCaseParams): GetStatusList=>{
  return async ()=>{
    const statuses = await adapter.statusRepository.list({});

    if (!statuses){
      throw new NotFoundError({
        code: 'STATUSES_NOT_FOUND'
      });
    }

    return statuses;
  };
};