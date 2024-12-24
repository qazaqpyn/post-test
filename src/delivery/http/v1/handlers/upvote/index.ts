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
     *   post:
     *     tags:
     *       - Upvote
     *     security:
     *      - bearerAuth: []
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: Post id
     *     responses:
     *       200:
     *         description: Toggle upvote
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                  type: string
     *                  description: A message indicating the success of the operation
     *                  example: "Upvote toggled successfully"
     */
    namespace.get(
      '/:postId',
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