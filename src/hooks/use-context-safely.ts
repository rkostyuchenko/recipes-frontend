import { Context, use } from 'react';

export const useContextSafely = <T>(context: Context<T>): NonNullable<T> => {
  const ctx = use(context);

  if (!ctx) {
    throw new Error(`You are trying to use ${context.displayName} outside of the provider`);
  }

  return ctx;
};
