import qs from 'qs';
import * as apiRequest from 'utils/api-request';
import getRandomInt from 'utils/get-random-int';
import { Recipe, RecipeDetails, RecipeId } from 'domain/recipes';

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
  fetchRecipe(id: RecipeId) {
    const query = qs.stringify({
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    });

    return apiRequest.get<RecipeDetails>(`/recipes/${id}?${query}`);
  },
  fetchRandomRecipe() {
    return apiRequest
      .get<Recipe[]>(
        `/recipes?${qs.stringify({
          pagination: {
            pageSize: 1,
          },
        })}`,
      )
      .then(({ meta }) => {
        const query = qs.stringify({
          pagination: {
            pageSize: 1,
            page: getRandomInt(meta.pagination.total),
          },
          populate: ['images'],
        });

        return apiRequest.get<Recipe[]>(`/recipes?${query}`);
      })
      .then(({ data }) => data[0]);
  },
};

export default recipesApi;
