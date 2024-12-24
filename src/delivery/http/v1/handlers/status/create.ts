import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CreateStatusRequest } from '../types';

type Params = Pick<DeliveryParams, 'status'>

export type CreateStatus = (req: CreateStatusRequest, res: Response)=>Promise<Response>
export const buildCreateStatus = ({ status }: Params): CreateStatus=>{
  return async (req, res)=>{
    const data = await status.createStatus({
      ...req.body
    });

    return res.status(200).json(data);
  };
};