import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

interface UseRequestReturn<Response> {
  data?: Response
  error?: unknown
  isFetching: boolean
}

interface Response<Data> {
  data: Data,
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const useRequest = <Data>(endpoint: string): UseRequestReturn<Response<Data>> => {
  const [data, setData] = useState<Response<Data>>();
  const [error, setError] = useState<unknown>();
  const [isFetching, setIsFetching] = useState(true);
  
  useEffect(() => {
    let ignore = false;
  
    const doFetch = async () => {
      let response: AxiosResponse<Response<Data>>;

      try {
        response = await axios.get(`${STRAPI_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
      } catch (error) {
        setError(error);

        return;
      }

      if (!ignore) {
        setData(response.data);
        setIsFetching(false);
      }
    };

    doFetch();

    return () => {
      ignore = true;
    };
  }, [endpoint]);

  return {
    isFetching,
    data,
    error,
  };
}

export default useRequest;
