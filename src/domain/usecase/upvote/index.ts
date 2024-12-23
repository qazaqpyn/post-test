import { buildToggleUpvote, ToggleUpvote } from './toggle';
import { UseCaseParams } from '@/domain/usecase/types';


export type FeedbackPostUseCase = {
  toggleUpvote: ToggleUpvote;
}

export const buildAuthUseCase = (params: UseCaseParams): FeedbackPostUseCase => {
  return {
    toggleUpvote: buildToggleUpvote(params)
  }
}
