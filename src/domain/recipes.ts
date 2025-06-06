type ImageFormat = 'thumbnail' | 'medium' | 'large';

type RecipeImage = {
  url: string;
  formats: {
    [key in ImageFormat]?: {
      url: string;
    };
  };
};

export type Recipe = {
  documentId: string;
  calories: number;
  cookingTime: number;
  summary: string;
  images: RecipeImage[];
  name: string;
};

type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

type Direction = {
  description: string;
};

type RecipeEquipment = {
  id: number;
  name: string;
};

export type RecipeId = string;

export type RecipeDetails = {
  name: string;
  likes: number;
  cookingTime: number;
  totalTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  images: RecipeImage[];
  summary: string;
  ingradients: Ingredient[];
  equipments: RecipeEquipment[];
  directions: Direction[];
};
