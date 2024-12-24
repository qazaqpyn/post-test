import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { ICategory } from '@/domain/entity/category';

export type GetCategoryList = () =>
    Promise<ICategory[] | never>
export const buildGetCategoryList = ({ adapter }: UseCaseParams): GetCategoryList=>{
  return async ()=>{
    const categories = await adapter.categoryRepository.list({});

    if (!categories){
      throw new NotFoundError({
        code: 'CATEGORIES_NOT_FOUND'
      });
    }

    return categories;
  };
};