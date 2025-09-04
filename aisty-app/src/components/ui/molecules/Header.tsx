"use client";

import { Flex, HStack, Spacer } from "@chakra-ui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/atoms/Button";
import { Box } from "@/components/ui/atoms/Box";
import { Heading } from "@/components/ui/atoms/Heading";
import { Image } from "@/components/ui/atoms/Image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <Flex
      as="header"
      p={6}
      bg="rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      transition="all 0.3s ease"
    >
      <HStack>
        <Image
          src="/images/image.png"
          boxSize="60px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />
        <Heading as="h2" size="lg" color="white" fontWeight="bold">
          AiSty(開発期間中によりテスト版です)
        </Heading>
      </HStack>
      <Spacer />
      <Box>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Flex gap={3} alignItems="center">
            <Button
              variant="ghost"
              color="gray.300"
              size="md"
              borderRadius="full"
              px={6}
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                color: "white",
                transform: "translateY(-1px)",
              }}
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              transition="all 0.2s ease"
              onClick={() => router.push("/sign-in")}
            >
              ログイン
            </Button>
            <Button
              bgGradient="linear(to-r, teal.500, teal.400)"
              color="white"
              size="md"
              borderRadius="full"
              px={6}
              _hover={{
                bgGradient: "linear(to-r, teal.400, teal.300)",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
              }}
              boxShadow="0 4px 15px rgba(56, 178, 172, 0.2)"
              transition="all 0.2s ease"
              onClick={() => router.push("/sign-up")}
            >
              新規登録
            </Button>
          </Flex>
        </SignedOut>
      </Box>
    </Flex>
  );
};
