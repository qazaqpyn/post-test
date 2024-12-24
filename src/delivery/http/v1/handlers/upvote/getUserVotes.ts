import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'upvote'>

export type GetUserUpvotes = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildGetUserUpvotes = ({ upvote }: Params): GetUserUpvotes=>{
  return async (req, res)=>{
    const posts = await upvote.getMyUpvotes({
      id: req.user.id
    });
    
    return res.status(200).json(posts);
  };
};