import MultiDropdown, { Option } from 'ui/multi-dropdown';

import { observer } from 'mobx-react-lite';
import { useStore } from 'services/store';
import { useContextSafely } from 'hooks/use-context-safely';
import { RecipesFiltersContext } from 'components/recipes-filters';

const getHandleText = (value: Option[]) => {
  if (!value.length) {
    return 'Categories';
  }

  return value.map(({ value }) => value).join(', ');
};

const MealCategorySelect = observer(() => {
  const mealCategoriesStore = useStore('mealCategories');
  const { filters } = useContextSafely(RecipesFiltersContext);
  const { category } = filters;

  const mealCategoryOptions: Option[] = mealCategoriesStore.mealCategories.map((category) => ({
    key: category.id.toString(),
    value: category.title,
  }));

  const checkedMealCategories = mealCategoryOptions.filter(({ key }) => category.value.includes(Number(key)));

  const handleChange = (value: Option[]) => {
    category.setValue(value.map(({ key }) => Number(key)));
  };

  return (
    <MultiDropdown
      options={mealCategoryOptions}
      value={checkedMealCategories}
      onChange={handleChange}
      getTitle={getHandleText}
    />
  );
});

export default MealCategorySelect;
