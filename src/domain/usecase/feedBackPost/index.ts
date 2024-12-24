import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreatePost, CreatePost } from './create';
import { buildDeletePost, DeletePost } from './delete';
import { buildGetPostById, GetPostById } from './getByid';
import { buildGetPostList, GetPostList } from './list';
import { buildUpdatePost, UpdatePost } from './update';

export type FeedbackPostUseCase = {
  createPost: CreatePost;
  deletePost: DeletePost;
  getPostById: GetPostById;
  getPostList: GetPostList;
  updatePost: UpdatePost;
}

export const buildFeedbackPostUseCase = (params: UseCaseParams): FeedbackPostUseCase => {
  const createPost = buildCreatePost(params);
  const deletePost = buildDeletePost(params);
  const getPostById = buildGetPostById(params);
  const getPostList = buildGetPostList(params);
  const updatePost = buildUpdatePost(params);
  

  return {
    createPost,
    deletePost,
    getPostById,
    getPostList,
    updatePost,
  };
};
