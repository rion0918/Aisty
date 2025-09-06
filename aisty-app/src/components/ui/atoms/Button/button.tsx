import React from "react";
import { Button as ChakraButton, ButtonProps, forwardRef } from "@chakra-ui/react";

// Polymorphic Button wrapper that keeps Chakra's typing
export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <ChakraButton ref={ref} {...props} />
));

Button.displayName = "Button";

export type { ButtonProps };
