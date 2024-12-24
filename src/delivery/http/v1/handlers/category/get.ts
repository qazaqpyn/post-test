import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CategoryRequest } from '../types';

type Params = Pick<DeliveryParams, 'category'>

export type GetCategory = (req: CategoryRequest, res: Response)=>Promise<Response>
export const buildGetCategory = ({ category }: Params): GetCategory=>{
  return async (req, res)=>{
    const posts = await category.getCategoryById({
      id: req.params.categoryId
    });
    
    return res.status(200).json(posts);
  };
};