import { PageMargin, PageSection } from 'components/page';
import Banner from 'components/banner';
import SearchRow from 'components/search-row';
import Text from 'ui/text';
import MealCategoryList from 'components/meal-category-list';

import { useNavigate } from 'react-router';
import Spacer from 'components/spacer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/recipes/?name=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <PageMargin>
        <PageSection>
          <Text variant="header-2" as="h1" color="accent">
            Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
          </Text>
          <Spacer top={32}>
            <SearchRow onSearch={handleSearch} />
          </Spacer>
        </PageSection>
        <PageSection>
          <MealCategoryList />
        </PageSection>
        <PageSection title="Trending Today">
          <Banner />
        </PageSection>
      </PageMargin>
    </>
  );
};

export default HomePage;
