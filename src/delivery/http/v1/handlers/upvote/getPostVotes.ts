import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { UpvoteRequest } from '../types';

type Params = Pick<DeliveryParams, 'upvote'>

export type GetPostUpvotes = (req: UpvoteRequest, res: Response)=>Promise<Response>
export const buildGetPostUpvotes = ({ upvote }: Params): GetPostUpvotes=>{
  return async (req, res)=>{
    const posts = await upvote.getPostUpvotes({
      postId: req.params.postId
    });
    
    return res.status(200).json(posts);
  };
};