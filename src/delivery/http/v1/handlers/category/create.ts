import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CreateCategoryRequest } from '../types';

type Params = Pick<DeliveryParams, 'category'>

export type CreateCategory = (req: CreateCategoryRequest, res: Response)=>Promise<Response>
export const buildCreateCategory = ({ category }: Params): CreateCategory=>{
  return async (req, res)=>{
    const data = await category.createCategory({
      ...req.body
    });

    return res.status(200).json(data);
  };
};