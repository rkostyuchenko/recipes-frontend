import Text from 'ui/text';
import RawText from 'components/raw-text';
import RecipeMeta from './meta';
import RecipeMetaDefinition from './meta-definition';
import { Link } from 'react-router';

import cn from 'classnames';

import classes from './recipe-card.module.scss';

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

const RecipeCard: React.FC<Props> = (props) => {
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
      <Text className={classes.name} tag="h1" view="title">
        <Link className={classes.link} to="/">
          {name}
        </Link>
      </Text>
      <Text className={classes.summary} view="p-16" tag="div">
        <RawText text={summary} />
      </Text>
      {imageUrl && <img className={classes.image} src={imageUrl} alt="" />}
      <RecipeMeta>
        {recipeMeta.map(({ name, value }) => (
          <RecipeMetaDefinition key={name} name={name} value={value} />
        ))}
      </RecipeMeta>
      <div className={cn(classes.column, classes.ingredients)}>
        <Text className={classes.caption} view="p-20" weight="bold" tag="h2">
          Ingredients
        </Text>
        <ul className={cn(classes.list, classes.listTypeIngredients)}>
          {ingredients.map((ingredient) => (
            <li key={ingredient} className={classes.listItem}>
              <Text className={classes.listItemText} tag="span" view="p-16">
                {ingredient}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(classes.column, classes.equipment)}>
        <Text className={classes.caption} view="p-20" weight="bold" tag="h2">
          Equipment
        </Text>
        <ul className={cn(classes.list, classes.listTypeEquipment)}>
          {equipments.map((ingredient) => (
            <li key={ingredient} className={classes.listItem}>
              <Text tag="span" view="p-16">
                {ingredient}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.directions}>
        <Text className={classes.caption} view="p-20" weight="bold" tag="h2">
          Directions
        </Text>
        <ul className={classes.steps}>
          {directions.map((step) => (
            <li key={step} className={classes.step}>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default RecipeCard;
