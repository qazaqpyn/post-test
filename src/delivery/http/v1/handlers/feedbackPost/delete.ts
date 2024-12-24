import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { FeedbackPostRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type DeletePost = (req: FeedbackPostRequest, res: Response)=>Promise<Response>
export const buildDeletePost = ({ feedbackPost }: Params): DeletePost=>{
  return async (req, res)=>{

    const data = await feedbackPost.deletePost({
      postId: req.params.postId
    });

    return res.status(200).json(data);
  };
};