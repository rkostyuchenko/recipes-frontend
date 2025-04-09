import * as apiRequest from 'utils/api-request';
import { MealCategory } from 'domain/meal-categories';

const mealCategoriesApi = {
  fetchMealCategoriesList() {
    return apiRequest.get<MealCategory[]>('/meal-categories');
  },
};

export default mealCategoriesApi;
