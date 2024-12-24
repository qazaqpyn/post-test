import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IStatus } from '@/domain/entity/status';

export type GetStatusById = (data: {
  id: string,
}) =>
    Promise<IStatus | never>
export const buildGetStatusById = ({ adapter }: UseCaseParams): GetStatusById=>{
  return async ({ id })=>{
    const status = await adapter.statusRepository.get({
      where: {
        id
      }
    });

    if (!status){
      throw new NotFoundError({
        code: 'STATUS_NOT_FOUND'
      });
    }

    return status;
  };
};