import { FeedbackPost } from '@prisma/client';

export interface IFeedbackPost extends FeedbackPost {}

/**
* @openapi
 * components:
 *   entities:
 *      FeedbackPost:
 *          required:
 *            - id
 *            - title
 *            - description
 *            - category_id
 *            - status_id
 *            - author_id
 *            - created_at
 *            - updated_at
 *          properties: 
 *            id:
 *                type: string
 *                format: uuid
 *                default: uuid()
 *            title:
 *                type: string
 *            description:
 *                type: string
 *            category_id:
 *                type: string
 *            status_id:
 *                type: string
 *            author_id:
 *                type: string
 *            created_at:
 *                type: string
 *                format: date-time
 *                default: now()
 *            updated_at:
 *                type: string
 *                format: date-time
 *                default: updatedAt
 *            upvotes:
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Upvote'
 */