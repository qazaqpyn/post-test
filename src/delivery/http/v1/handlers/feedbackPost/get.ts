import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { FeedbackPostRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type GetPost = (req: FeedbackPostRequest, res: Response)=>Promise<Response>
export const buildGetPost = ({ feedbackPost }: Params): GetPost=>{
  return async (req, res)=>{
    const posts = await feedbackPost.getPostById({
      id: req.params.postId
    });
    
    return res.status(200).json(posts);
  };
};