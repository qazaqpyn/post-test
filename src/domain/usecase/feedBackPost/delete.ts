import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type DeletePost = (params:{
  postId:string
}) => Promise<IFeedbackPost | never>

export const buildDeletePost = ({ adapter }: UseCaseParams): DeletePost=>{
  return async ({ postId })=>{

    const post = await adapter.feedbackPostRepository.delete({
      where: {
        id: postId
      }
    });

    return post;
  };
};