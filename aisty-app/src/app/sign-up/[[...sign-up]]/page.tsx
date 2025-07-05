import { SignUp } from "@clerk/nextjs";
import { Flex } from "@chakra-ui/react";

export default function Page() {
  return (
    <Flex justify="center" align="center" minH="100vh">
      <SignUp 
        appearance={{
          layout: {
            logoImageUrl: "/images/image.png",
          },
        }}
      />
    </Flex>
  );
}