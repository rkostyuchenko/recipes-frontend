type ImageFormat = 'thumbnail' | 'medium' | 'large';

type RecipeImage = {
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
