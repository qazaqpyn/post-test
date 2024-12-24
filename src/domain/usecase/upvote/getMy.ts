import { IUpvote } from '@/domain/entity/upvote';
import { NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '@/domain/usecase/types';

export type GetMyUpvotes = (params:{
    id:string
}) =>
    Promise< IUpvote[] | never>
export const buildGetMyUpvotes = ({ adapter }: UseCaseParams): GetMyUpvotes=>{
  return async ({ id })=>{
    const upvotes = await adapter.upvoteRepository.list({
      where: {
        userId: id,
      }
    });

    if (!upvotes){
      throw new NotFoundError({
        code: 'UPVOTES_NOT_FOUND'
      });
    }

    return upvotes; 
  };
};