import { MealCategoryId } from 'domain/meal-categories';

export type RecipeFiltersValues = {
  name: string;
  category: MealCategoryId[];
};
