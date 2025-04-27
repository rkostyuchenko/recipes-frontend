import RecipeList from 'components/recipe-list';
import { PageSection, PageMargin } from 'components/page';
import Text from 'ui/text';
import Spacer from 'components/spacer';

import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'services/store';
import { useTypedQuery, useQueryUpdate } from 'hooks/use-query';
import useRecipes from 'hooks/use-recipes';
import { z } from 'zod';

const queryParamsSchema = z.object({
  page: z.coerce.number().default(1).catch(1),
});

const FavoritesPage = observer(() => {
  const { page } = useTypedQuery(queryParamsSchema);

  const userStore = useStore('userStore');
  const { favorites } = userStore;

  const { isLoading, isCompleted, recipes, pageCount, pagination, handlePageChange } = useRecipes(
    page,
    useMemo(() => ({ id: favorites }), [favorites.length]),
  );

  useQueryUpdate({
    page: `${pagination.pageNumber}`,
  });

  return (
    <PageSection>
      <PageMargin>
        <Text variant="header-2" as="h1" color="accent">
          Favorites
        </Text>
        <Spacer top={32}>
          {isCompleted && !recipes.length ? (
            <Text variant="body-2">Nothing here yet</Text>
          ) : (
            <RecipeList
              recipes={recipes}
              isLoading={isLoading}
              currentPage={pagination.pageNumber}
              totalPages={pageCount}
              onPageChange={handlePageChange}
              skeletonCount={6}
            />
          )}
        </Spacer>
      </PageMargin>
    </PageSection>
  );
});

export default FavoritesPage;
