import axios, { AxiosResponse } from 'axios';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const API_TOKEN = import.meta.env.API_TOKEN;

console.debug(API_TOKEN);

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface Response<Data> {
  data: Data;
  meta: {
    pagination: Pagination;
  };
}

const httpClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    common: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  },
});

export const get = async <Data>(endpoint: string) => {
  let response: AxiosResponse<Response<Data>>;

  try {
    response = await httpClient.get(`${STRAPI_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch (error) {
    console.error(error);

    throw error;
  }

  return response.data;
};
