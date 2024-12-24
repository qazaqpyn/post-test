import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { UpvoteRequest } from '../types';

type Params = Pick<DeliveryParams, 'upvote'>

export type ToggleUpvote = (req: UpvoteRequest, res: Response)=>Promise<Response>
export const buildToggleUpvote = ({ upvote }: Params): ToggleUpvote=>{
  return async (req, res)=>{
    const data = await upvote.toggleUpvote({
      id: req.user.id,
      ...req.params
    });

    return res.status(200).json(data);
  };
};