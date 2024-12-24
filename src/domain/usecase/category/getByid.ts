import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { ICategory } from '@/domain/entity/category';

export type GetCategoryById = (data: {
  id: string,
}) =>
    Promise<ICategory | never>
export const buildGetCategoryById = ({ adapter }: UseCaseParams): GetCategoryById=>{
  return async ({ id })=>{
    const category = await adapter.categoryRepository.get({
      where: {
        id
      }
    });

    if (!category){
      throw new NotFoundError({
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    return category;
  };
};