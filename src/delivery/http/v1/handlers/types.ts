import Express from 'express';

export interface IHandler {
  registerRoutes: (root: Express.Router) => void
}

export interface RegisterRequest extends Express.Request {
  body: {
    email: string;
    password: string;
  }
}

export interface AuthRequest extends Express.Request {
  user: {
    id: string;
  };
}

export interface FeedbackPostRequest extends AuthRequest {
  params: {
    postId: string;
  }
}

export interface CreateFeedbackPostRequest extends AuthRequest {
  body : {
    title: string;
    description: string;
    category: string;
    status: string;
  }
}

export interface ListFeedbackPostRequest extends AuthRequest {
  query: {
    category?: string;
    status?: string;
    sortBy?: 'DateAsc' | 'DateDesc' | 'UpvoteAsc' | 'UpvoteDesc';
    skip?: string;
    take?: string;
  }
}

export interface UpdateFeedbackPostRequest extends AuthRequest {
  body : {
    title?: string;
    description?: string;
    category?: string;
    status?: string;
  }
}

export interface CategoryRequest extends AuthRequest {
  params: {
    categoryId: string;
  }
}

export interface CreateCategoryRequest extends AuthRequest {
  body : {
    name: string;
  }
}

export interface StatusRequest extends AuthRequest {
  params: {
    statusId: string;
  }
}

export interface CreateStatusRequest extends AuthRequest {
  body : {
    name: string;
  }
}

export interface UpvoteRequest extends AuthRequest {
  params: {
    postId: string;
  }
}

