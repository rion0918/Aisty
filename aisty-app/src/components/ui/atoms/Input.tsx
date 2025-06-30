import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

interface Props extends InputProps {
  // You can add custom props here if needed
}

export const Input = (props: Props) => {
  return <ChakraInput {...props} />;
};
