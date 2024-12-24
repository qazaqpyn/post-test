import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { IHandler } from '../types';
import { createRouteHandler } from '../../routeHandler';
import { authorizedRules } from './rules';
import { ToggleUpvote, buildToggleUpvote } from './toggle';
import { buildGetUserUpvotes, GetUserUpvotes } from './getUserVotes';
import { buildGetPostUpvotes, GetPostUpvotes } from './getPostVotes';


type Params = Pick<DeliveryParams, 'upvote'>;

export type UpvoteMethods = {
  toggleUpvote: ToggleUpvote;
  getUserUpvotes: GetUserUpvotes;
  getPostUpvotes: GetPostUpvotes;
};

const buildRegisterRoutes = (methods: UpvoteMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    namespace.use(authorizedRules);

    /**
     * @openapi
     * /upvote:
     *   get:
     *     tags:
     *       - Upvote
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: List of user upvotes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/entities/Upvote'
     */
    namespace.get(
      '',
      createRouteHandler(methods.getUserUpvotes)
    );

    /**
     * @openapi
     * /upvote/{postId}:
     *   get:
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
     *         description: List of post upvotes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/entities/Upvote'
     */
    namespace.get(
      '/:postId',
      createRouteHandler(methods.getPostUpvotes)
    );

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
    namespace.post(
      '/:postId',
      createRouteHandler(methods.toggleUpvote)
    );

    root.use('/upvote', namespace);
  }
);

export const buildUpvoteHandler = (params: Params): IHandler => {
  return {
    registerRoutes: buildRegisterRoutes({
      toggleUpvote: buildToggleUpvote(params),
      getUserUpvotes: buildGetUserUpvotes(params),
      getPostUpvotes: buildGetPostUpvotes(params),
    })
  };
};