import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { IHandler } from '../types';
import { createRouteHandler } from '../../routeHandler';
import { authorizedRules } from './rules';
import { ToggleUpvote, buildToggleUpvote } from './toggle';


type Params = Pick<DeliveryParams, 'upvote'>;

export type UpvoteMethods = {
  toggleUpvote: ToggleUpvote; 
};

const buildRegisterRoutes = (methods: UpvoteMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    namespace.use(authorizedRules);

    /**
 * @openapi
 * /upvote/{postId}:
 *   get:
 *     tags:
 *       - Upvote
 *     summary: Upvote a feedback post
 *     description: This endpoint allows you to upvote a feedback post by providing its ID. Requires Authorization
 *    parameters:
 *      - in: path
 *       name: postId
 *      required: true
 *     schema:
 *      type: string
 *    description: The ID of the feedback post to upvote.
 *     responses:
 *       200:
 *         description: Successfully upvoted the feedback post
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *          properties:
 *          message:
 *          type: string
 *         description: A message confirming the upvote
 *        example: "Feedback post upvoted successfully."
 *      404:
 *       description: Feedback post not found
 *     500:
 *      description: Server error while upvoting the feedback post
 */


    namespace.get(
      ':postId',
      createRouteHandler(methods.toggleUpvote)
    );

    root.use('/upvote', namespace);
  }
);

export const buildFeedbackPostHandler = (params: Params): IHandler => {
  return {
    registerRoutes: buildRegisterRoutes({
      toggleUpvote: buildToggleUpvote(params)
    })
  };
};