import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { StatusRequest } from '../types';

type Params = Pick<DeliveryParams, 'status'>

export type DeleteStatus = (req: StatusRequest, res: Response)=>Promise<Response>
export const buildDeleteStatus = ({ status }: Params): DeleteStatus=>{
  return async (req, res)=>{

    const data = await status.deleteStatus({
      statusId: req.params.statusId
    });

    return res.status(200).json(data);
  };
};