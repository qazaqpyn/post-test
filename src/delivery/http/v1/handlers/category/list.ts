import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'category'>
export type GetCategoryList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetCategoryList = ({ category }: Params): GetCategoryList => {
  return async (_, res) => {
    const posts = await category.getCategoryList();
    
    return res.status(200).json(posts);
  };
};