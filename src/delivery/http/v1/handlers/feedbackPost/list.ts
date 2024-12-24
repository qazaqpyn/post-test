import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { ListFeedbackPostRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>
export type GetList = (req: ListFeedbackPostRequest, res: Response) => Promise<Response>

export const buildGetList = ({ feedbackPost }: Params): GetList => {
  return async (req, res) => {
    const skipNumber = Number(req.query.skip);
    const takeNumber = Number(req.query.take);

    const posts = await feedbackPost.getPostList({
      ...req.query,
      skip: isNaN(skipNumber) ? undefined : skipNumber,
      take: isNaN(takeNumber) ? undefined : takeNumber,
    });
    
    return res.status(200).json(posts);
  };
};