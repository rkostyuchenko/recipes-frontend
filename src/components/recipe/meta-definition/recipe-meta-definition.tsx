import Text from 'ui/text';

import classes from '../recipe.module.scss';

interface Props {
  name: string;
  value: string | number;
}

const RecipeMetaDefinition: React.FC<Props> = (props) => {
  const { name, value } = props;

  return (
    <div>
      <dt className={classes.term}>{name}</dt>
      <dd className={classes.definition}>
        <Text variant="body-2" color="accent" as="span" weight="bold">
          {value}
        </Text>
      </dd>
    </div>
  );
};

export default RecipeMetaDefinition;
