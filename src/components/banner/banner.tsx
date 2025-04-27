import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from 'services/store';
import { useEffect } from 'react';

import Text from 'ui/text';
import Link from 'ui/link';

import classes from './banner.module.scss';

interface Props {
  className?: string;
}

const Banner: React.FC<Props> = observer((props) => {
  const { className } = props;

  const recipeSuggestStore = useStore('recipeSuggest');
  const { fetchRecipeSuggest, recipeSuggest } = recipeSuggestStore;

  useEffect(() => {
    if (!recipeSuggest) {
      fetchRecipeSuggest();
    }
  }, []);

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
