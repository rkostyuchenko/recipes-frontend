import Text from 'ui/text';

import classes from '../recipe-card.module.scss';

interface Props {
  name: string
  value: string | number
}

const RecipeMetaDefinition: React.FC<Props> = (props) => {
  const {
    name,
    value,
  } = props;

  return (
    <div>
      <dt className={classes.term}>
        {name}
      </dt>
      <dd className={classes.definition}>
        <Text
          view="p-16"
          color="accent"
          tag="span"
          weight="bold"
        >
          {value}
        </Text>
      </dd>
    </div>
  );
};

export default RecipeMetaDefinition;
