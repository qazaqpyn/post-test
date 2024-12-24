import { UseCaseParams } from '@/domain/usecase/types';
import { ICategory } from '@/domain/entity/category';

export type UpdateCategory = (params:{
  categoryId:string,
  name:string,
}) => Promise<ICategory | never>

export const buildUpdateCategory = ({ adapter }: UseCaseParams): UpdateCategory=>{
  return async ({ categoryId, name })=>{
    const post = await adapter.categoryRepository.update({
      where: {
        id: categoryId
      },
      data: {
        name
      }
    });

    return post;
  };
};