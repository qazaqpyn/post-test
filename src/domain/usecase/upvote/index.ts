import { buildGetPostUpvotes, GetPostUpvotes } from './getPostVotes';
import { GetMyUpvotes, buildGetMyUpvotes } from './getMy';
import { buildToggleUpvote, ToggleUpvote } from './toggle';
import { UseCaseParams } from '@/domain/usecase/types';


export type UpvoteUseCase = {
  toggleUpvote: ToggleUpvote;
  getMyUpvotes: GetMyUpvotes;
  getPostUpvotes: GetPostUpvotes;
}

export const buildUpvoteUseCase = (params: UseCaseParams): UpvoteUseCase => {
  return {
    toggleUpvote: buildToggleUpvote(params),
    getMyUpvotes: buildGetMyUpvotes(params),
    getPostUpvotes: buildGetPostUpvotes(params),
  };
};
