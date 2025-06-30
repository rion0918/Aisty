import { Heading as ChakraHeading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  // You can add custom props here if needed
}

export const Heading = (props: Props) => {
  return <ChakraHeading {...props} />;
};
