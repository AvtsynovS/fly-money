import { PropsWithChildren } from 'react';

export const Workspace = ({ children }: PropsWithChildren) => {
  return <div className="max-w-5xl space-y-6">{children}</div>;
};
