import { UseCaseParams } from '@/domain/usecase/types';
import { ICategory } from '@/domain/entity/category';

export type CreateCategory = (params:{
 name: string 
}) => Promise<ICategory | never>

export const buildCreateCategory = ({ adapter }: UseCaseParams): CreateCategory=>{
  return async ({ name })=>{
    const category = await adapter.categoryRepository.create({
      data: {
        name
      }
    });

    return category;
  };
};