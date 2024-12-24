import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { IHandler } from '../types';
import { createRouteHandler } from '../../routeHandler';
import { authorizedRules } from './rules';
import { buildDeleteStatus, DeleteStatus } from './delete';
import { buildCreateStatus, CreateStatus } from './create';
import { buildGetStatusList, GetStatusList } from './list';
import { buildUpdateStatus, UpdateStatus } from './update';
import { buildGetStatus, GetStatus } from './get';

type Params = Pick<DeliveryParams, 'status'>;

export type StatusMethods = {
  getStatusList: GetStatusList;
  getStatus: GetStatus;
  createStatus: CreateStatus;
  deleteStatus: DeleteStatus;
  updateStatus: UpdateStatus;
};

const buildRegisterRoutes = (methods: StatusMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    namespace.use(authorizedRules);

    /**
     * @openapi
     * /status/list:
     *  get:
     *   tags: Status
     *  produces:
     *   - application/json
     * responses:
     *  200:
     *  description: List of statuses
     * content:
     *  application/json:
     *    schema:
     *      type: array
     *      items:
     *        $ref: '#/components/entities/Status'
      */


    namespace.get(
      'list',
      createRouteHandler(methods.getStatusList)
    );

    /**
     * @openapi
     * /status:
     *  get:
     *   tags: Status
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: statusId
     *    required: true
     *    schema:
     *      type: string
     *    description: status id
     * responses:
     *  200:
     *  description: Created status
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Status'
     */


    namespace.get(
      ':statusId',
      createRouteHandler(methods.getStatus)
    );

    /**
     * @openapi
     * /status:
     *  post:
     *   tags: Status
     *  produces:
     *   - application/json
     * requestBody:
     *  required: true
     *  content:
     *    application/json:
     *      schema:
     *        type: object
     *       properties:
     *        name:
     *         type: string
     *         description: Status name
     * responses:
     *  200:
     *  description: Created status
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Status'
     */

    namespace.post(
      '',
      createRouteHandler(methods.createStatus)
    );

    /**
     * @openapi
     * /status:
     *  delete:
     *   tags: Status
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: statusId
     *    required: true
     *    schema:
     *      type: string
     *     description: status id
     * responses:
     *  200:
     *  description: Created status
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Status'
     */


    namespace.delete(
      ':statusId',
      createRouteHandler(methods.deleteStatus)
    );

    /**
     * @openapi
     * /status:
     *  put:
     *   tags: Status
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: statusId
     *    required: true
     *    schema:
     *      type: string
     *    description: Status id
     *  requestBody:
     *   required: true
     *   content:
     *    application/json:
     *      schema:
     *        type: object
     *        properties:
     *          name:
     *            type: string
     *            description: Status name
     *            required: true
     * responses:
     *  200:
     *  description: Created status
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Status
     */


    namespace.put(
      ':statusId',
      createRouteHandler(methods.updateStatus)
    );


    root.use('/status', namespace);
  }
);

export const buildStatusHandler = (params: Params): IHandler => {
  const getStatusList = buildGetStatusList(params);
  const getStatus = buildGetStatus(params);
  const createStatus = buildCreateStatus(params);
  const deleteStatus = buildDeleteStatus(params);
  const updateStatus = buildUpdateStatus(params);

  return {
    registerRoutes: buildRegisterRoutes({
      getStatusList,
      getStatus,
      createStatus,
      deleteStatus,
      updateStatus  
    })
  };
};