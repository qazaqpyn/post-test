import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { IHandler } from '../types';
import { createRouteHandler } from '../../routeHandler';
import { buildCreateCategory, CreateCategory } from './create';
import { authorizedRules } from './rules';
import { buildDeleteCategory, DeleteCategory } from './delete';
import { buildUpdateCategory, UpdateCategory } from './update';
import { buildGetCategoryList, GetCategoryList } from './list';
import { buildGetCategory, GetCategory } from './get';

type Params = Pick<DeliveryParams, 'category'>;

export type CategoryMethods = {
  getCategory: GetCategory;
  getCategoryList: GetCategoryList;
  createCategory: CreateCategory;
  deleteCategory: DeleteCategory;
  updateCategory: UpdateCategory;
};

const buildRegisterRoutes = (methods: CategoryMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    namespace.use(authorizedRules);

    /**
     * @openapi
     * /category/list:
     *  get:
     *   tags: Category
     *  produces:
     *   - application/json
     * responses:
     *  200:
     *  description: List of categories
     * content:
     *  application/json:
     *    schema:
     *      type: array
     *      items:
     *        $ref: '#/components/entities/Category'
      */


    namespace.get(
      'list',
      createRouteHandler(methods.getCategoryList)
    );

    /**
     * @openapi
     * /category:
     *  get:
     *   tags: Category
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: categoryId
     *    required: true
     *    schema:
     *      type: string
     *     description: Category id
     * responses:
     *  200:
     *  description: Created category
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Category'
     */


    namespace.get(
      ':categoryId',
      createRouteHandler(methods.getCategory)
    );

    /**
     * @openapi
     * /category:
     *  post:
     *   tags: Category
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
     *         description: Category name
     * responses:
     *  200:
     *  description: Created category
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Category'
     */

    namespace.post(
      '',
      createRouteHandler(methods.createCategory)
    );

    /**
     * @openapi
     * /category:
     *  delete:
     *   tags: Category
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: categoryId
     *    required: true
     *    schema:
     *      type: string
     *     description: Category id
     * responses:
     *  200:
     *  description: Delete category
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Category'
     */


    namespace.delete(
      ':categoryId',
      createRouteHandler(methods.deleteCategory)
    );

    /**
     * @openapi
     * /category:
     *  put:
     *   tags: Category
     *  produces:
     *   - application/json
     *  parameters:
     *    - in: path
     *    name: categoryId
     *    required: true
     *    schema:
     *      type: string
     *    description: Category id
     *  requestBody:
     *   required: true
     *   content:
     *    application/json:
     *      schema:
     *        type: object
     *        properties:
     *          name:
     *            type: string
     *            description: Category name
     *            required: true
     * responses:
     *  200:
     *  description: Created category
     * content:
     *  application/json:
     *    schema:
     *      $ref: '#/components/entities/Category'
     */


    namespace.put(
      ':categoryId',
      createRouteHandler(methods.updateCategory)
    );


    root.use('/category', namespace);
  }
);

export const buildCategoryHandler = (params: Params): IHandler => {
  const getCategoryList = buildGetCategoryList(params);
  const getCategory = buildGetCategory(params);
  const createCategory = buildCreateCategory(params);
  const deleteCategory = buildDeleteCategory(params);
  const updateCategory = buildUpdateCategory(params);

  return {
    registerRoutes: buildRegisterRoutes({
      getCategoryList,
      getCategory,
      createCategory,
      deleteCategory,
      updateCategory
    })
  };
};