import Text from 'ui/text';
import Link from 'ui/link';
import BannerSkeleton from './skeleton';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import useRecipeSuggest from 'hooks/use-recipe-suggest';

import classes from './banner.module.scss';

interface Props {
  className?: string;
}

const Banner: React.FC<Props> = observer((props) => {
  const { className } = props;

  const { isLoading, recipeSuggest } = useRecipeSuggest();

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (!recipeSuggest) {
    return null;
  }

  return (
    <article className={cn(classes.wrap, className)}>
      <div className={classes.content}>
        <Text variant="header-1" as="h3">
          <Link overlay to={`/recipes/${recipeSuggest.documentId}`}>
            {recipeSuggest.name}
          </Link>
        </Text>
      </div>
      <div className={classes.cover}>
        <img className={classes.image} src={recipeSuggest.images[0].url} />
      </div>
    </article>
  );
});

export default Banner;
