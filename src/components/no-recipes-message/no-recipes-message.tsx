import Text from 'ui/text';

import classes from './no-recipes-message.module.scss';

interface Props {
  onClearFiltersClick(): void;
}

const NoRecipesMessage: React.FC<Props> = (props) => {
  const { onClearFiltersClick } = props;

  return (
    <Text view="p-20" align="center">
      No recipes found. Try looking for something else.{' '}
      <button className={classes.button} type="button" onClick={onClearFiltersClick}>
        Reset filters
      </button>
      .
    </Text>
  );
};

export default NoRecipesMessage;
