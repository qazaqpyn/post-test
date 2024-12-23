import { UseCaseParams } from '@/domain/usecase/types';
import { GetStatusList, buildGetStatusList } from './list';

export type StatusUseCase = {
  getStatusList: GetStatusList;
}

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  return {
    getStatusList: buildGetStatusList(params)
  }
}