import qs from 'qs';
import * as apiRequest from 'utils/api-request';
import { Recipe } from 'domain/recipes';

export interface FetchListParams {
  filters?: {
    name?: string;
    category?: number[];
  };
  page?: number;
  pageSize: number;
}

const recipesApi = {
  fetchRecipesList(params: FetchListParams) {
    const { filters = {}, page = 1, pageSize } = params;

    const query = qs.stringify({
      populate: ['images'],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        ...(filters.name
          ? {
              name: {
                $containsi: filters.name,
              },
            }
          : {}),
        ...(filters.category
          ? {
              category: {
                $eq: filters.category,
              },
            }
          : {}),
      },
    });

    return apiRequest.get<Recipe[]>(`/recipes?${query}`);
  },
};

export default recipesApi;
