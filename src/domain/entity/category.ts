import { Category } from '@prisma/client';

export interface ICategory extends Category {}

/**
 * @openapi
 * components:
 *   entities:
 *      Category:
 *          required:
 *            - id
 *            - name
 *          properties: 
 *            id:
 *                type: string
 *                format: uuid
 *                default: uuid()
 *            name:
 *                type: string
 *                unique: true
 *            feedbackPosts:
 *                type: array
 *                items:
 *                    $ref: '#/components/entities/FeedbackPost'
 */