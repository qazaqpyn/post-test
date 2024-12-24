import { UseCaseParams } from '@/domain/usecase/types';
import { ICategory } from '@/domain/entity/category';

export type DeleteCategory = (params:{
  categoryId:string
}) => Promise<ICategory | never>

export const buildDeleteCategory = ({ adapter }: UseCaseParams): DeleteCategory=>{
  return async ({ categoryId })=>{

    const category = await adapter.categoryRepository.delete({
      where: {
        id: categoryId
      }
    });

    return category;
  };
};