import { UseCaseParams } from '@/domain/usecase/types';
import { GetCategoryList, buildGetCategoryList } from './list';

export type CategoryUseCase = {
  getCategoryList: GetCategoryList;
}

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  return {
    getCategoryList: buildGetCategoryList(params)
  }
}