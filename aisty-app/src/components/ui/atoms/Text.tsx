import { Text as ChakraText, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  // You can add custom props here if needed
}

export const Text = (props: Props) => {
  return <ChakraText {...props} />;
};
