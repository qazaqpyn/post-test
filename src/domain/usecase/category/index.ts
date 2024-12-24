import { buildGetCategoryById, GetCategoryById } from './getByid';
import { buildCreateCategory, CreateCategory } from './create';
import { UseCaseParams } from '@/domain/usecase/types';
import { GetCategoryList, buildGetCategoryList } from './list';
import { buildDeleteCategory, DeleteCategory } from './delete';
import { buildUpdateCategory, UpdateCategory } from './update';

export type CategoryUseCase = {
  getCategoryList: GetCategoryList;
  createCategory: CreateCategory;
  deleteCategory: DeleteCategory;
  updateCategory: UpdateCategory;
  getCategoryById: GetCategoryById;
}

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  return {
    getCategoryList: buildGetCategoryList(params),
    createCategory: buildCreateCategory(params),
    deleteCategory: buildDeleteCategory(params),
    updateCategory: buildUpdateCategory(params),
    getCategoryById: buildGetCategoryById(params)
  };
};