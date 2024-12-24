import { IUpvote } from '@/domain/entity/upvote';
import { NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '@/domain/usecase/types';

export type GetPostUpvotes = (params:{
    postId:string
}) =>
    Promise< IUpvote[] | never>
export const buildGetPostUpvotes = ({ adapter }: UseCaseParams): GetPostUpvotes=>{
  return async ({ postId })=>{
    const upvotes = await adapter.upvoteRepository.list({
      where: {
        feedbackPostId: postId,
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