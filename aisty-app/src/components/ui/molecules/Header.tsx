"use client";

import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/atoms/Button/button";
import { Box } from "@/components/ui/atoms/Box/box";
import { Heading } from "@/components/ui/atoms/Heading/heading";
import { Image } from "@/components/ui/atoms/Image/image";
import NextLink from "next/link";
import { FiMenu } from "react-icons/fi";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        p={{ base: 4, md: 6 }}
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
        <HStack spacing={{ base: 2, md: 4 }}>
          <Image
            src="/images/image.png"
            boxSize={{ base: "40px", md: "60px" }}
            borderRadius="full"
            fit="cover"
            alt="AiSty Logo"
          />
          <Heading
            as="h2"
            size={{ base: "sm", md: "lg" }}
            color="white"
            fontWeight="bold"
            display={{ base: "none", sm: "block" }}
          >
            AiSty(開発期間中によりテスト版です)
          </Heading>
          <Heading
            as="h2"
            size="sm"
            color="white"
            fontWeight="bold"
            display={{ base: "block", sm: "none" }}
          >
            AiSty
          </Heading>
        </HStack>
        <Spacer />

        {/* デスクトップ表示 */}
        <Box display={{ base: "none", md: "block" }}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Flex gap={3} alignItems="center">
              <Button
                as={NextLink}
                href="/sign-in"
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
              >
                ログイン
              </Button>
              <Button
                as={NextLink}
                href="/sign-up"
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
              >
                新規登録
              </Button>
            </Flex>
          </SignedOut>
        </Box>

        {/* モバイル表示 */}
        <Box display={{ base: "block", md: "none" }}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <IconButton
              aria-label="メニューを開く"
              icon={<FiMenu size={20} />}
              variant="ghost"
              color="white"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
              }}
              onClick={onOpen}
            />
          </SignedOut>
        </Box>
      </Flex>

      {/* モバイルメニュー */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(0, 0, 0, 0.9)" backdropFilter="blur(20px)">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            color="white"
            borderBottomWidth="1px"
            borderColor="gray.700"
          >
            AiSty
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              <Button
                as={NextLink}
                href="/sign-in"
                onClick={onClose}
                variant="ghost"
                color="gray.300"
                size="lg"
                borderRadius="full"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.2)"
              >
                ログイン
              </Button>
              <Button
                as={NextLink}
                href="/sign-up"
                onClick={onClose}
                bgGradient="linear(to-r, teal.500, teal.400)"
                color="white"
                size="lg"
                borderRadius="full"
                _hover={{
                  bgGradient: "linear(to-r, teal.400, teal.300)",
                }}
                boxShadow="0 4px 15px rgba(56, 178, 172, 0.2)"
              >
                新規登録
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
