import { buildGetStatusById, GetStatusById } from './getByid';
import { buildCreateStatus, CreateStatus } from './create';
import { UseCaseParams } from '@/domain/usecase/types';
import { GetStatusList, buildGetStatusList } from './list';
import { buildDeleteStatus, DeleteStatus } from './delete';
import { UpdateStatus, buildUpdateStatus } from './update';

export type StatusUseCase = {
  getStatusList: GetStatusList;
  createStatus: CreateStatus;
  deleteStatus: DeleteStatus;
  getStatusById: GetStatusById;
  updateStatus: UpdateStatus;
}

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  return {
    getStatusList: buildGetStatusList(params),
    createStatus: buildCreateStatus(params),
    deleteStatus: buildDeleteStatus(params),
    getStatusById: buildGetStatusById(params),
    updateStatus: buildUpdateStatus(params),
  };
};