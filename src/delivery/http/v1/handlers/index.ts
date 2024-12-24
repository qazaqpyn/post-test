import Express from 'express';
import { IHandler } from './types';
import { DeliveryParams } from '@/delivery/types';
import { buildAuthHandler } from './auth';
import { buildFeedbackPostHandler } from './feedbackPost';
import { buildCategoryHandler } from './category';
import { buildStatusHandler } from './status';
import { buildUpvoteHandler } from './upvote';

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router();

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildCategoryHandler(params),
    buildStatusHandler(params),
    buildFeedbackPostHandler(params),
    buildUpvoteHandler(params),
  ];

  for (let i = 0; i < handlers.length; i++){
    const handler = handlers[i];

    handler.registerRoutes(router);
  }

  return router;
};
