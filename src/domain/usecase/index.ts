import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildCategoryUseCase, CategoryUseCase } from './category';
import { buildFeedbackPostUseCase, FeedbackPostUseCase } from './feedBackPost';
import { buildStatusUseCase, StatusUseCase } from './status';
import { UseCaseParams } from './types';
import { buildUpvoteUseCase, UpvoteUseCase } from './upvote';

export type UseCase = {
  auth: AuthUseCase;
  feedbackPost: FeedbackPostUseCase;
  category: CategoryUseCase;
  status: StatusUseCase;
  upvote: UpvoteUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbackPost = buildFeedbackPostUseCase(params);
  const category = buildCategoryUseCase(params);
  const status = buildStatusUseCase(params);
  const upvote = buildUpvoteUseCase(params);

  return {
    auth,
    feedbackPost,
    category,
    status,
    upvote,
  };
};
