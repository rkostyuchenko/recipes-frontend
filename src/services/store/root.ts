import MealCategoriesStore from 'stores/meal-categories';
import RecipeSuggestStore from 'stores/recipe-suggest';

export class RootStore {
  mealCategories: MealCategoriesStore;
  recipeSuggest: RecipeSuggestStore;

  constructor() {
    this.mealCategories = new MealCategoriesStore();
    this.recipeSuggest = new RecipeSuggestStore();
  }
}

export default new RootStore();

export type GlobalStores = keyof RootStore;
