import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from 'services/store';
import { useEffect } from 'react';

import Loader from 'ui/loader';
import Text from 'ui/text';
import RawText from 'components/raw-text';

import classes from './banner.module.scss';

interface Props {
  className?: string;
}

const Banner: React.FC<Props> = observer((props) => {
  const { className } = props;

  const recipeSuggestStore = useStore('recipeSuggest');
  const { fetchRecipeSuggest, isLoading, recipeSuggest } = recipeSuggestStore;

  useEffect(() => {
    if (!recipeSuggest) {
      fetchRecipeSuggest();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!recipeSuggest) {
    return null;
  }

  return (
    <article className={cn(classes.wrap, className)}>
      <div className={classes.content}>
        <Text className={classes.title} view="title" maxLines={3} tag="h2">
          {recipeSuggest.name}
        </Text>
        <Text className={classes.description} view="p-20" maxLines={5} tag="div">
          <RawText text={recipeSuggest.summary} />
        </Text>
      </div>
      <div className={classes.cover}>
        <img className={classes.image} src={recipeSuggest.images[0].url} />
      </div>
    </article>
  );
});

export default Banner;
