import { Upvote } from '@prisma/client';

export interface IUpvote extends Upvote {}

/**
 * @openapi
 * components:
 *   entities:
 *      Upvote:
 *          required:
 *            - id
 *            - userId
 *            - feedbackPostId
 *            - created_at
 *          properties: 
 *            id:
 *                type: string
 *                format: uuid
 *                default: uuid()
 *            userId:
 *                type: string
 *            feedbackPostId:
 *                type: string
 *            user:
 *                $ref: '#/components/entities/User'
 *            feedbackPost:
 *                $ref: '#/components/entities/FeedbackPost'
 *            created_at:
 *                type: string
 *                format: date
 *            unique:
 *                type: array
 *                items:
 *                    type: string
 *                    enum: [userId, feedbackPostId]
 */