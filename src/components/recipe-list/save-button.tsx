import Button from 'ui/button';

import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { RecipeId } from 'domain/recipes';
import { useStore } from 'services/store';

interface Props {
  recipeId: RecipeId;
}

const SaveButton: React.FC<Props> = observer((props) => {
  const { recipeId } = props;

  const userStore = useStore('userStore');
  const { toggleFavorite } = userStore;

  const isFavorite = computed(() => userStore.isFavorite(recipeId)).get();

  return (
    <Button
      type="button"
      onClick={() => {
        toggleFavorite(recipeId);
      }}
    >
      {isFavorite ? 'Saved' : 'Save'}
    </Button>
  );
});

export default SaveButton;
