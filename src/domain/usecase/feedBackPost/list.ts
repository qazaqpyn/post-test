import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { Prisma } from '@prisma/client';

export type GetPostList = (params: {
  category?: string;
  status?: string;
  sortby?: 'DateAsc' | 'DateDesc' | 'UpvoteAsc' | 'UpvoteDesc';
  skip?: number;
  take?: number;
}) => Promise<IFeedbackPost[] | never>;

export const buildGetPostList = ({ adapter }: UseCaseParams): GetPostList => {
  return async ({ category, status, sortby, skip, take }) => {
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

    if (sortby) {
      queryParams.orderBy = [];
      if (sortby === 'DateAsc' || sortby === 'DateDesc') {
        queryParams.orderBy.push({ created_at: sortby === 'DateAsc' ? 'asc' : 'desc' });
      } else if (sortby === 'UpvoteAsc' || sortby === 'UpvoteDesc') {
        queryParams.orderBy.push({ upvotes: { _count: sortby === 'UpvoteAsc' ? 'asc' : 'desc' } });
      }
    } 

    return adapter.feedbackPostRepository.list(queryParams);
  };
};