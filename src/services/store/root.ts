import MealCategoriesStore from 'stores/meal-categories';
import RecipeSuggestStore from 'stores/recipe-suggest';
import UserStore from 'stores/user/user';

export class RootStore {
  mealCategories: MealCategoriesStore;
  recipeSuggest: RecipeSuggestStore;
  userStore: UserStore;

  constructor() {
    this.mealCategories = new MealCategoriesStore();
    this.recipeSuggest = new RecipeSuggestStore();
    this.userStore = new UserStore();
  }
}

export default new RootStore();

export type GlobalStores = keyof RootStore;
