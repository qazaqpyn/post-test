import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type CreatePost = (params:{
  authorId:string,
  title:string,
  description:string,
  category:string,
  status:string
}) => Promise<IFeedbackPost | never>

export const buildCreatePost = ({ adapter }: UseCaseParams): CreatePost=>{
  return async ({ authorId,title,description,category, status })=>{
    let categoryItem = await adapter.categoryRepository.get({
      where: {
        name: category.toLowerCase()
      }
    });

    if (!categoryItem){
      categoryItem = await adapter.categoryRepository.create({
        data: {
          name: category.toLowerCase()
        }
      });
    }

   
    let statusItem = await adapter.statusRepository.get({
      where: {
        name: status.toLowerCase()
      }
    });

    if (!statusItem){
      statusItem = await adapter.statusRepository.create({
        data: {
          name: status.toLowerCase()
        }
      });
    }

    const post = await adapter.feedbackPostRepository.create({
      data: {
        author_id: authorId,
        title,
        description,
        category_id: categoryItem.id,
        status_id: statusItem.id
      }
    });

    return post;
  };
};