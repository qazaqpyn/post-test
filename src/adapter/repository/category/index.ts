import { AdapterParams } from '@/adapter/types';
import { buildCount, Count } from './count';
import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { List, buildList } from './list';
import { buildCreate, Create} from './create'
import { buildGet, Get} from './get'

type Params = Pick<AdapterParams, 'db'>

export type CategoryRepository = {
  count: Count,
  create: Create,
  delete: Delete,
  get: Get,
  list: List,
  update: Update,
}
export const buildCategoryRepository = (params: Params): CategoryRepository=>{
  const count = buildCount(params)
  const create = buildCreate(params)
  const deleteCategory = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)
  const update = buildUpdate(params)

  return {
    count,
    create,
    delete: deleteCategory,
    get,
    list,
    update,
  }
}
