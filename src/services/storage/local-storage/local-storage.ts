const prefix = '_fc';

const makeKey = (key: string) => `${prefix}:${key}`;

const storage = {
  set(key: string, value: unknown) {
    localStorage.setItem(makeKey(key), JSON.stringify(value));
  },
  get(key: string) {
    const value = localStorage.getItem(makeKey(key));

    if (value === null) {
      return undefined;
    }

    if (value === 'null') {
      return null;
    }

    if (value === 'undefined') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  },
};

export default storage;
