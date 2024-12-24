import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { CreateFeedbackPostRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type CreatePost = (req: CreateFeedbackPostRequest, res: Response)=>Promise<Response>
export const buildCreatePost = ({ feedbackPost }: Params): CreatePost=>{
  return async (req, res)=>{
    const data = await feedbackPost.createPost({
      authorId: req.user.id,
      ...req.body
    });

    return res.status(200).json(data);
  };
};