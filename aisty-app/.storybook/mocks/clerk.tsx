import React from 'react';

type Props = { children?: React.ReactNode };

export const SignedIn: React.FC<Props> = ({ children }) => {
  const signedIn = (globalThis as any).__STORYBOOK_CLERK_SIGNED_IN ?? true;
  return signedIn ? <>{children}</> : null;
};

export const SignedOut: React.FC<Props> = ({ children }) => {
  const signedIn = (globalThis as any).__STORYBOOK_CLERK_SIGNED_IN ?? true;
  return !signedIn ? <>{children}</> : null;
};

export const UserButton: React.FC = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: '#4FD1C7',
      display: 'inline-block',
    }}
    title="User"
  />
);

