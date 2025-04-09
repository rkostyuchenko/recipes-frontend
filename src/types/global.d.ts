interface ImportMetaEnv {
  readonly [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.woff2';
declare module '*.scss';

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.svg' {
  import React from 'react';

  const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;

  export default ReactComponent;
}
