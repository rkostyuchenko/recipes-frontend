import { PageMargin, PageSection } from 'components/page';
import RecipeCard from 'components/recipe-card';

import { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router';
import RecipeStore from 'stores/recipe';

const RecipePage = observer(() => {
  const { recipeId } = useParams();
  const recipeStore = useLocalObservable(() => new RecipeStore());

  useEffect(() => {
    recipeStore.fetchRecipe(recipeId!);
  }, [recipeId]);

  const { recipe, isCompleted } = recipeStore;

  return (
    <PageSection>
      <PageMargin>
        {isCompleted && recipe && (
          <RecipeCard
            name={recipe.name}
            preparationTime={`${recipe.preparationTime} minutes`}
            cookingTime={`${recipe.cookingTime} minutes`}
            totalTime={`${recipe.totalTime} minutes`}
            likes={recipe.likes}
            servings={`${recipe.servings} servings`}
            rating={`${recipe.rating} / 5`}
            summary={recipe.summary}
            ingredients={recipe.ingradients.map(({ name, amount, unit }) => `${amount} ${unit} ${name}`)}
            equipments={recipe.equipments.map(({ name }) => name)}
            directions={recipe.directions.map(({ description }) => description)}
            imageUrl={recipe.images[0]?.url}
          />
        )}
      </PageMargin>
    </PageSection>
  );
});

export default RecipePage;
