import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { UpdateFeedbackPostRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type UpdatePost = (req: UpdateFeedbackPostRequest, res: Response)=>Promise<Response>
export const buildUpdatePost = ({ feedbackPost }: Params): UpdatePost=>{
  return async (req, res)=>{

    const data = await feedbackPost.updatePost({
      postId: req.params.postId,
      ...req.body
    });

    return res.status(200).json(data);
  };
};