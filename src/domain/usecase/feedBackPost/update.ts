import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { Prisma } from '@prisma/client';
import { ICategory } from '@/domain/entity/category';
import { IStatus } from '@/domain/entity/status';

export type UpdatePost = (params:{
  postId:string,
  title?:string,
  description?:string,
  category?:string
  status?:string
}) => Promise<IFeedbackPost | never>

export const buildUpdatePost = ({ adapter }: UseCaseParams): UpdatePost=>{
  return async ({ postId, title, description, category, status })=>{
    let categoryItem: ICategory | null = null;
    let statusItem: IStatus | null = null;

    if (category) {
      categoryItem = await adapter.categoryRepository.get({
        where: { name: category }
      });

      if (!categoryItem) {
        categoryItem = await adapter.categoryRepository.create({
          data: {
            name: category.toLowerCase()
          }
        });
      }
    }

    if (status) {
      statusItem = await adapter.statusRepository.get({
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
    }

    const updateData: Prisma.FeedbackPostUpdateInput = {
      ...(title && { title }),
      ...(description && { description }),
      ...(categoryItem && { category_id: categoryItem.id }),
      ...(statusItem && { status_id: statusItem.id })
    };

    const post = await adapter.feedbackPostRepository.update({
      where: {
        id: postId
      },
      data: updateData
    });

    return post;
  };
};