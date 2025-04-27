import * as apiRequest from 'utils/api-request';
import { MealCategory } from 'domain/meal-categories';
import qs from 'qs';

const mealCategoriesApi = {
  fetchMealCategoriesList() {
    const query = qs.stringify({
      populate: ['image', 'recipes'],
    });

    return apiRequest.get<MealCategory[]>(`/meal-categories?${query}`);
  },
};

export default mealCategoriesApi;
