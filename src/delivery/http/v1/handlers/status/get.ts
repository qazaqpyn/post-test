import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { StatusRequest } from '../types';

type Params = Pick<DeliveryParams, 'status'>

export type GetStatus = (req: StatusRequest, res: Response)=>Promise<Response>
export const buildGetStatus = ({ status }: Params): GetStatus=>{
  return async (req, res)=>{
    const posts = await status.getStatusById({
      id: req.params.statusId
    });
    
    return res.status(200).json(posts);
  };
};