import React, { forwardRef } from "react";
import { Box as ChakraBox, BoxProps } from "@chakra-ui/react";

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <ChakraBox ref={ref} {...props} />;
});

Box.displayName = "Box";

export type { BoxProps };
