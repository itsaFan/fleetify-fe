export type Pagination = {
  totalData: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type ApiResponseWithPagination<T> = {
  message: string;
  data: T;
  pagination: Pagination;
};

export type ApiErrorResponse = {
  message: string;
};

export type Queries = {
  limit: number;
  page: number;
  sortBy?: string | number;
  sortDir?: "asc" | "desc";
  search?: string;
  tz?: string;
  to?: string;
  from?: string;
  dept_id?: string | number;
};
