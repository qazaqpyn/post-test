import { AdapterParams } from '@/adapter/types';
import { buildDelete, Delete } from './delete';
import { List, buildList } from './list';
import { buildCreate, Create} from './create'
import { buildGet, Get} from './get'

type Params = Pick<AdapterParams, 'db'>

export type UpvoteRepository = {
  create: Create,
  delete: Delete,
  get: Get,
  list: List,
}
export const buildUpvoteRepository = (params: Params): UpvoteRepository=>{
  const create = buildCreate(params)
  const deleteUpvote = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)

  return {
    create,
    delete: deleteUpvote,
    get,
    list,
  }
}
