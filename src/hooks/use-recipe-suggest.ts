import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import RecipeSuggestStore from 'stores/recipe-suggest';

const useRecipeSuggest = () => {
  const recipeSuggestStore = useLocalObservable(() => new RecipeSuggestStore());
  const { fetchRecipeSuggest, isLoading, recipeSuggest } = recipeSuggestStore;

  useEffect(() => {
    if (!recipeSuggest) {
      fetchRecipeSuggest();
    }
  }, []);

  return { isLoading, recipeSuggest };
};

export default useRecipeSuggest;
