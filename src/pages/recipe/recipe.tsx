import { PageMargin, PageSection } from 'components/page';
import RecipeCard from 'components/recipe-card';

import { useParams } from 'react-router';
import useRequest from 'hooks/use-request';
import qs from 'qs';

type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

type Direction = {
  description: string;
};

type RecipeImage = {
  url: string;
};

type RecipeEquipment = {
  id: number;
  name: string;
};

type Recipe = {
  name: string;
  likes: number;
  cookingTime: number;
  totalTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  images: RecipeImage[];
  summary: string;
  ingradients: Ingredient[]; // ingrAdients
  equipments: RecipeEquipment[];
  directions: Direction[];
};

const RecipePage = () => {
  const { recipeId } = useParams();

  const query = qs.stringify({
    populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
  });

  const { isFetching, data, error } = useRequest<Recipe>(`/recipes/${recipeId}?${query}`);

  if (error) {
    return null;
  }

  return (
    <PageSection>
      <PageMargin>
        {!isFetching && data && (
          <RecipeCard
            name={data.data.name}
            preparationTime={`${data.data.preparationTime} minutes`}
            cookingTime={`${data.data.cookingTime} minutes`}
            totalTime={`${data.data.totalTime} minutes`}
            likes={data.data.likes}
            servings={`${data.data.servings} servings`}
            rating={`${data.data.rating} / 5`}
            summary={data.data.summary}
            ingredients={data.data.ingradients.map(({ name, amount, unit }) => `${amount} ${unit} ${name}`)}
            equipments={data.data.equipments.map(({ name }) => name)}
            directions={data.data.directions.map(({ description }) => description)}
            imageUrl={data.data.images[0]?.url}
          />
        )}
      </PageMargin>
    </PageSection>
  );
};

export default RecipePage;
