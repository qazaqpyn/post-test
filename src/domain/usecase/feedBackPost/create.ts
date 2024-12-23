import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type CreatePost = (params:{
  author_id:string,
  title:string,
  description:string,
  category_name:string,
  status_name:string
}) => Promise<IFeedbackPost | never>

export const buildCreatePost = ({adapter}: UseCaseParams): CreatePost=>{
  return async ({author_id,title,description,category_name, status_name})=>{
    let category = await adapter.categoryRepository.get({
      where:{
        name:category_name.toLowerCase()
      }
    })

    if(!category){
      category = await adapter.categoryRepository.create({
        data:{
          name:category_name.toLowerCase()
        }
      })
    }

   
    let status = await adapter.statusRepository.get({
      where:{
        name:status_name.toLowerCase()
      }
    })

    if(!status){
      status = await adapter.statusRepository.create({
        data:{
          name:status_name.toLowerCase()
        }
      })
    }

    const post = await adapter.feedbackPostRepository.create({
      data:{
        author_id,
        title,
        description,
        category_id:category.id,
        status_id: status.id
      }
    })

    return post
  }
}