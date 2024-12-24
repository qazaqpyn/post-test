import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { Prisma } from '@prisma/client';

export type GetPostList = (params: {
  category?: string;
  status?: string;
  sortBy?: 'DateAsc' | 'DateDesc' | 'UpvoteAsc' | 'UpvoteDesc';
  skip?: number;
  take?: number;
}) => Promise<IFeedbackPost[] | never>;

export const buildGetPostList = ({ adapter }: UseCaseParams): GetPostList => {
  return async ({ category, status, sortBy, skip, take }) => {
    const queryParams: Prisma.FeedbackPostFindManyArgs = {
      where: {
        ...(category && {
          category: {
            name: category,
          },
        }),
        ...(status && {
          status: {
            name: status,
          },
        }),
      },
      skip,
      take,
      orderBy: [],
    };

    if (sortBy) {
      queryParams.orderBy = [];
      if (sortBy === 'DateAsc' || sortBy === 'DateDesc') {
        queryParams.orderBy.push({ created_at: sortBy === 'DateAsc' ? 'asc' : 'desc' });
      } else if (sortBy === 'UpvoteAsc' || sortBy === 'UpvoteDesc') {
        queryParams.orderBy.push({ upvotes: { _count: sortBy === 'UpvoteAsc' ? 'asc' : 'desc' } });
      }
    } 

    return adapter.feedbackPostRepository.list(queryParams);
  };
};