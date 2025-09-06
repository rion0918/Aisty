import React from "react";
import { Box as ChakraBox, BoxProps } from "@chakra-ui/react";

export const Box = (props: BoxProps) => {
  return <ChakraBox {...props} />;
};

export type { BoxProps };
