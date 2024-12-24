import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CreateCategoryRequest } from '../types';

type Params = Pick<DeliveryParams, 'category'>

export type UpdateCategory = (req: CreateCategoryRequest, res: Response)=>Promise<Response>
export const buildUpdateCategory = ({ category }: Params): UpdateCategory=>{
  return async (req, res)=>{

    const data = await category.updateCategory({
      categoryId: req.params.categoryId,
      ...req.body
    });

    return res.status(200).json(data);
  };
};