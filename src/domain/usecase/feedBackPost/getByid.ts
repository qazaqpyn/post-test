import {UseCaseParams} from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type GetPostById = (data: {
  id: string,
}) =>
    Promise<IFeedbackPost | never>
export const buildGetPostById = ({adapter}: UseCaseParams): GetPostById=>{
  return async ({id})=>{
    const post = await adapter.feedbackPostRepository.get({
      where: {
        id
      }
    })

    if (!post){
      throw new NotFoundError({
        code: 'POST_NOT_FOUND'
      })
    }

    return post
  }
}