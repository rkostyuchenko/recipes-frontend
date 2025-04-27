import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import qs from 'query-string';

export const useQuery = () => {
  const [searchParams] = useSearchParams();
  const query = qs.parse(searchParams.toString(), {
    parseNumbers: true,
    types: {
      page: 'number',
      category: 'number[]',
    },
    arrayFormat: 'comma',
  });

  return query;
};

export const useQueryUpdate = (newQuery: Record<string, string | string[] | number[]>) => {
  const [, setSearchParams] = useSearchParams();

  const query = useQuery();
  const search = qs.stringify(
    {
      ...query,
      ...newQuery,
    },
    {
      skipEmptyString: true,
      arrayFormat: 'comma',
    },
  );

  useEffect(() => {
    setSearchParams(new URLSearchParams(search), { replace: true });
  }, [search]);
};
