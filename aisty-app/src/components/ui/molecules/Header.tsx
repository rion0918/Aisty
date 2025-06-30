import { Flex, Spacer } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/atoms/Button";
import { Box } from "@/components/ui/atoms/Box";

export const Header = () => {
  return (
    <Flex as="header" p={4} borderBottom="1px" borderColor="gray.200" alignItems="center">
      <Spacer />
      <Box>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Flex gap={2}>
            <SignInButton>
              <Button colorScheme="teal">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="outline">Sign Up</Button>
            </SignUpButton>
          </Flex>
        </SignedOut>
      </Box>
    </Flex>
  );
};
