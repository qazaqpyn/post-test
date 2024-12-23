import { Status } from '@prisma/client';

export interface IStatus extends Status {}

/**
 * @openapi
 * components:
 *   entities:
 *      Status:
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
 *                    $ref: '#/components/schemas/FeedbackPost'
 */