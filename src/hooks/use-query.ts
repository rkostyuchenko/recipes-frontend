import { useEffect } from 'react';
import qs from 'query-string';
import { useSearchParams } from 'react-router';
import type { ZodTypeAny } from 'zod';

export const useTypedQuery = <T extends ZodTypeAny>(schema: T): ReturnType<T['parse']> => {
  const [searchParams] = useSearchParams();

  return schema.parse(searchParamsToValues(searchParams));
};

type SearchParamsValues = Record<string, string[] | string | undefined>;

function searchParamsToValues(searchParams: URLSearchParams): SearchParamsValues {
  return Array.from(searchParams.keys()).reduce((record, key) => {
    const values = searchParams.getAll(key);

    return { ...record, [key]: values.length > 1 ? values : values[0] };
  }, {} as SearchParamsValues);
}

export const useQueryUpdate = (newQuery: Record<string, string | string[] | number[]>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = qs.parse(searchParams.toString());

  const search = qs.stringify(
    {
      ...query,
      ...newQuery,
    },
    { skipEmptyString: true },
  );

  useEffect(() => {
    setSearchParams(new URLSearchParams(search), { replace: true });
  }, [search]);
};
