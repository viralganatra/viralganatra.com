declare module '*.webp' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  import React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const content: any;

  export const ReactComponent;
  export default content;
}
