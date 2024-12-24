import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'status'>
export type GetStatusList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetStatusList = ({ status }: Params): GetStatusList => {
  return async (_, res) => {
    const posts = await status.getStatusList();
    
    return res.status(200).json(posts);
  };
};