import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CreateStatusRequest } from '../types';

type Params = Pick<DeliveryParams, 'status'>

export type UpdateStatus = (req: CreateStatusRequest, res: Response)=>Promise<Response>
export const buildUpdateStatus = ({ status }: Params): UpdateStatus=>{
  return async (req, res)=>{

    const data = await status.updateStatus({
      statusId: req.params.statusId,
      ...req.body
    });

    return res.status(200).json(data);
  };
};