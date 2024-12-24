import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { IHandler } from '../types';
import { createRouteHandler } from '../../routeHandler';
import { buildCreatePost, CreatePost } from './create';
import { authorizedRules } from './rules';
import { buildDeletePost, DeletePost } from './delete';
import { buildUpdatePost, UpdatePost } from './update';
import { buildGetList, GetList } from './list';
import { buildGetPost, GetPost } from './get';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type FeedbackPostMethods = {
  getList:GetList,
  getPost:GetPost,
  createPost:CreatePost,
  deletePost:DeletePost,
  updatePost:UpdatePost
};

const buildRegisterRoutes = (methods: FeedbackPostMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    namespace.use(authorizedRules);

    /**
 * @openapi
 * /feedbackPost/list:
 *   get:
 *     tags:
 *       - FeedbackPost
 *     security:
 *       - bearerAuth: []
 *     summary: Get all feedback posts
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: category name to filter by
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Status to filter by
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: number
 *         description: The number of items to skip in pagination
 *       - in: query
 *         name: take
 *         required: false
 *         schema:
 *           type: number
 *         description: The number of items to take (limit the number of items)
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [DateAsc,DateDesc,UpvoteAsc,UpvoteDesc]
 *         description: Sorting method
 * 
 *     responses:
 *       200:
 *         description: A list of feedback posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/entities/FeedbackPost'
 */


    namespace.get(
      '/list',
      createRouteHandler(methods.getList)
    );

    /**
 * @openapi
 * /feedbackPost/{postId}:
 *   get:
 *     tags:
 *       - FeedbackPost
 *     security:
 *       - bearerAuth: []
 *     summary: Get a feedback post by its ID
 *     description: This endpoint allows you to retrieve a specific feedback post using its ID. Requires Authorization
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feedback post to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the feedback post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/entities/FeedbackPost'
 *       404:
 *         description: Feedback post not found
 *       500:
 *         description: Server error while retrieving the feedback post
 */

    namespace.get(
      '/:postId',
      createRouteHandler(methods.getPost)
    );

    /**
     * @openapi
     * /feedbackPost:
     *   post:
     *     tags:
     *       - FeedbackPost
     *     security:
     *       - bearerAuth: []
     *     summary: Create a new feedback post
     *     description: This endpoint allows you to create a new feedback post by providing a title, description, and category.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: The title of the feedback post
     *               description:
     *                 type: string
     *                 description: The description/content of the feedback post
     *               category:
     *                 type: string
     *                 description: The name of the category to which the feedback post belongs
     *               status:
     *                  type: string
     *                  description: The status of the feedback post. Must be one of the valid enum values.
     *             required:
     *               - title
     *               - description
     *               - category
     *               - status
     *     responses:
     *       201:
     *         description: Successfully created the feedback post
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/FeedbackPost'
     *       400:
     *         description: Invalid input data or missing required fields
     *       500:
     *         description: Server error while creating the feedback post
     */
    namespace.post(
      '',
      createRouteHandler(methods.createPost)
    );

    /**
     * @openapi
     * /feedbackPost/{postId}:
     *   delete:
     *     tags:
     *       - FeedbackPost
     *     security:
     *       - bearerAuth: []
     *     summary: Delete a feedback post by its ID
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the feedback post to delete.
     *     responses:
     *       200:
     *         description: Successfully deleted the feedback post
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: A message confirming the deletion
     *                   example: "Feedback post deleted successfully."
     *       404:
     *         description: Feedback post not found
     *       500:
     *         description: Server error or failure during deletion
     */


    namespace.delete(
      '/:postId',
      createRouteHandler(methods.deletePost)
    );

    /**
 * @openapi
 * /feedbackPost/{postId}:
 *   put:
 *     tags:
 *       - FeedbackPost
 *     security:
 *       - bearerAuth: []
 *     summary: Update a feedback post by its ID
 *     description: This endpoint allows you to update a feedback post by providing its ID and the fields to update (title, description, category, and status). Status accepts only [IDEA, PLANNED, IN_PROGRESS, COMPLETED, REJECTED]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feedback post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the feedback post
 *               description:
 *                 type: string
 *                 description: The updated description/content of the feedback post
 *               category:
 *                 type: string
 *                 description: The updated category name of the feedback post
 *               status:
 *                 type: string
 *                 description: The updated status of the feedback post. Must be one of the valid enum values.
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Successfully updated the feedback post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/entities/FeedbackPost'
 *       '400':
 *         description: Invalid input data or missing fields
 *       '404':
 *         description: Feedback post not found
 *       '500':
 *         description: Server error while updating the feedback post
 */


    namespace.put(
      '/:postId',
      createRouteHandler(methods.updatePost)
    );


    root.use('/feedbackPost', namespace);
  }
);

export const buildFeedbackPostHandler = (params: Params): IHandler => {
  const getList = buildGetList(params);
  const getPost = buildGetPost(params);
  const createPost = buildCreatePost(params);
  const deletePost = buildDeletePost(params);
  const updatePost = buildUpdatePost(params);

  return {
    registerRoutes: buildRegisterRoutes({
      getList,
      getPost,
      createPost,
      deletePost,
      updatePost
    })
  };
};