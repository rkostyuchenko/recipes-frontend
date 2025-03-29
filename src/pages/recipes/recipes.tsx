import RecipeList from 'components/recipe-list';
import { PageSection, PageMargin } from 'components/page';
import Banner from 'components/banner';
import Text from 'ui/text';
import Spacer from 'components/spacer';

const RecipesPage = () => {
  return (
    <>
      <Banner />
      <PageSection>
        <PageMargin>
          <Text view="p-20" align="center">
            Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
          </Text>
          <Spacer top={48}>
            <RecipeList />
          </Spacer>
        </PageMargin>
      </PageSection>
    </>
  );
};

export default RecipesPage;
