import { useSearchParams } from 'react-router';

const useQueryParam = <T>(key: string, defaultValue: T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key);

  const setValue = (value: T) => {
    setSearchParams(() => {
      // https://github.com/remix-run/react-router/issues/9757
      const params = new URLSearchParams(window.location.search);

      params.set(key, JSON.stringify(value));

      return params;
    });
  };

  return [value ? JSON.parse(value) : defaultValue, setValue];
};

export default useQueryParam;
