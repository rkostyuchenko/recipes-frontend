import Text from 'ui/text';
import RawText from 'components/raw-text';
import RecipeMeta from './meta';
import RecipeMetaDefinition from './meta-definition';

import cn from 'classnames';

import classes from './recipe.module.scss';

interface Props {
  name: string;
  preparationTime: string;
  cookingTime: string;
  totalTime: string;
  likes: number;
  servings: string;
  rating: string;
  summary: string;
  ingredients: string[];
  equipments: string[];
  directions: string[];
  imageUrl?: string;
}

const Recipe: React.FC<Props> = (props) => {
  const {
    name,
    preparationTime,
    cookingTime,
    totalTime,
    likes,
    servings,
    rating,
    summary,
    ingredients,
    equipments,
    directions,
    imageUrl,
  } = props;

  const recipeMeta = [
    { name: 'Preparation', value: preparationTime },
    { name: 'Cooking', value: cookingTime },
    { name: 'Total', value: totalTime },
    { name: 'Likes', value: likes },
    { name: 'Servings', value: servings },
    { name: 'Ratings', value: rating },
  ];

  return (
    <article className={classes.layout}>
      <Text className={classes.name} as="h1" variant="header-2" color="accent">
        {name}
      </Text>
      <Text className={classes.summary} variant="body-2" as="div">
        <RawText text={summary} />
      </Text>
      {imageUrl && <img className={classes.image} src={imageUrl} alt="" />}
      <RecipeMeta>
        {recipeMeta.map(({ name, value }) => (
          <RecipeMetaDefinition key={name} name={name} value={value} />
        ))}
      </RecipeMeta>
      <div className={classes.ingredients}>
        <Text className={classes.caption} variant="body-3" as="h2" weight="medium" color="accent">
          Ingredients
        </Text>
        <ul className={cn(classes.list, classes.listTypeIngredients)}>
          {ingredients.map((ingredient) => (
            <Text key={ingredient} className={classes.listItem} as="li" variant="body-2">
              {ingredient}
            </Text>
          ))}
        </ul>
      </div>
      <div className={classes.equipment}>
        <Text className={classes.caption} variant="body-3" as="h2" weight="medium" color="accent">
          Equipment
        </Text>
        <ul className={cn(classes.list, classes.listTypeEquipment)}>
          {equipments.map((ingredient) => (
            <Text key={ingredient} className={classes.listItem} as="li" variant="body-2">
              {ingredient}
            </Text>
          ))}
        </ul>
      </div>
      <div className={classes.directions}>
        <Text className={classes.caption} variant="body-3" weight="medium" as="h2" color="accent">
          Directions
        </Text>
        <ul className={classes.steps}>
          {directions.map((step) => (
            <Text key={step} className={classes.step} variant="body-2" as="li">
              {step}
            </Text>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Recipe;
