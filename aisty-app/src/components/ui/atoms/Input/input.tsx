import React from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

export const Input = (props: InputProps) => {
  return <ChakraInput {...props} />;
};

export type { InputProps };

