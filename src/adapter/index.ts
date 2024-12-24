import { buildStatusRepository, StatusRepository } from './repository/status/index';
import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildFeedbackPostRepository, FeedbackPostRepository } from './repository/feedbackPost';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';
import { buildUpvoteRepository, UpvoteRepository } from './repository/upvote';
import { buildCategoryRepository, CategoryRepository } from './repository/category';

export type Adapter = {
  userRepository: UserRepository;
  feedbackPostRepository: FeedbackPostRepository;
  statusRepository: StatusRepository;
  upvoteRepository: UpvoteRepository;
  categoryRepository: CategoryRepository;
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);
  const feedbackPostRepository = buildFeedbackPostRepository(params);
  const statusRepository = buildStatusRepository(params);
  const upvoteRepository = buildUpvoteRepository(params);
  const categoryRepository = buildCategoryRepository(params);

  return {
    userRepository,
    feedbackPostRepository,
    statusRepository,
    upvoteRepository,
    categoryRepository,
    exampleGateway
  };
};
