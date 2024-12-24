import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CategoryRequest } from '../types';

type Params = Pick<DeliveryParams, 'category'>

export type DeleteCategory = (req: CategoryRequest, res: Response)=>Promise<Response>
export const buildDeleteCategory = ({ category }: Params): DeleteCategory=>{
  return async (req, res)=>{

    const data = await category.deleteCategory({
      categoryId: req.params.categoryId
    });

    return res.status(200).json(data);
  };
};