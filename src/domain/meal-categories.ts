import { Recipe } from './recipes';

export type MealCategoryId = number;

type MealCategoryImage = {
  url: string;
  formats: {
    [key in 'thumbnail' | 'medium' | 'large']?: {
      url: string;
    };
  };
};

export type MealCategory = {
  id: MealCategoryId;
  title: string;
  image: MealCategoryImage;
  recipes: Partial<Recipe>[];
};
