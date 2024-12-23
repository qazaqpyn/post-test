import {UseCaseParams} from '@/domain/usecase/types';

export type ToggleUpvote = (params:{
    id:string
    postId:string
}) =>
    Promise< {message:string} | never>
export const buildToggleUpvote = ({adapter}: UseCaseParams): ToggleUpvote=>{
  return async ({id,postId})=>{
    console.log(id)
    let upvote = await adapter.upvoteRepository.get({
      where:{
        userId:id,
        feedbackPostId:postId
      }
    })

    if (!upvote){
      upvote = await adapter.upvoteRepository.create({
        data: {
          userId:id,
          feedbackPostId:postId
        }
      })
    }
    else{
      await adapter.upvoteRepository.delete({
        where:{
          id:upvote.id
        }
      })
    }

    return {message:'vote updated'}
  }
}