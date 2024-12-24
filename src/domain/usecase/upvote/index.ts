import { buildToggleUpvote, ToggleUpvote } from './toggle';
import { UseCaseParams } from '@/domain/usecase/types';


export type UpvoteUseCase = {
  toggleUpvote: ToggleUpvote;
}

export const buildUpvoteUseCase = (params: UseCaseParams): UpvoteUseCase => {
  return {
    toggleUpvote: buildToggleUpvote(params)
  };
};
