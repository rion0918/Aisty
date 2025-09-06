"use client";

import {
  Container,
  VStack,
  chakra,
  Button,
  Flex,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { Text } from "@/components/ui/atoms/Text/text";
import { Heading } from "@/components/ui/atoms/Heading/heading";
import { Box } from "@/components/ui/atoms/Box/box";
import { FiZap, FiCamera } from "react-icons/fi";
import { TbShirt } from "react-icons/tb";
import NextLink from "next/link";

const Video = chakra("video");

export const HeroSection = () => {
  return (
    <Box position="relative" minH="100vh" bg="black" overflow="hidden">
      {/* 背景動画とグラデーション */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="0"
      >
        <Box
          position="absolute"
          top="0"
          right="0"
          width="60%"
          height="100%"
          opacity="0.2"
        >
          <Video
            autoPlay
            muted
            loop
            playsInline
            width="100%"
            height="100%"
            objectFit="cover"
            filter="brightness(1.4) blur(1px)"
          >
            <source src="/images/douga.mp4" type="video/mp4" />
          </Video>
        </Box>

        {/* 美しいグラデーションオーバーレイ */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient="radial(ellipse at center left, rgba(56, 178, 172, 0.15) 0%, rgba(128, 90, 213, 0.1) 50%, transparent 70%)"
        />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex="2" py={20}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={16}
          alignItems="center"
          minH="80vh"
        >
          {/* 左側：メインコンテンツ */}
          <VStack align="start" spacing={8}>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              lineHeight="1.1"
              color="white"
              fontWeight="bold"
            >
              服選びの
              <Box
                as="span"
                bgGradient="linear(to-r, teal.300, purple.300)"
                bgClip="text"
                display="inline"
              >
                「失敗」
              </Box>
              AiStyで解決!
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="1.8"
              color="gray.300"
              maxW="500px"
            >
              衣服をオンラインで購入する前に、
              <br />
              一度試着してみませんか？
            </Text>

            {/* 特徴ポイント */}
            <VStack align="start" spacing={3} mt={6}>
              <Flex align="center" gap={3}>
                <FiZap size={20} color="#38B2AC" />
                <Text color="gray.300" fontSize="md">
                  高精度AI技術による自然な合成
                </Text>
              </Flex>
              <Flex align="center" gap={3}>
                <FiCamera size={20} color="#9F7AEA" />
                <Text color="gray.300" fontSize="md">
                  簡単アップロードで即座に試着
                </Text>
              </Flex>
            </VStack>
          </VStack>

          {/* 右側：デモ・統計情報 */}
          <VStack spacing={8} display={{ base: "none", lg: "flex" }}>
            {/* 統計カード */}
            <SimpleGrid columns={2} gap={4} width="full">
              <Card
                bg="rgba(255,255,255,0.05)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="gray.800"
              >
                <CardBody textAlign="center" py={6}>
                  <Box
                    boxSize={8}
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#38B2AC"
                      strokeWidth="2"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </Box>
                  <Heading size="lg" color="white" mb={1}>
                    90%
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    満足度
                  </Text>
                </CardBody>
              </Card>

              <Card
                bg="rgba(255,255,255,0.05)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="gray.800"
              >
                <CardBody textAlign="center" py={6}>
                  <TbShirt
                    size={32}
                    color="#9F7AEA"
                    style={{ marginBottom: "8px" }}
                  />
                  <Heading size="lg" color="white" mb={1}>
                    50K+
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    試着回数
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Card
              bg="rgba(56, 178, 172, 0.1)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="teal.700"
              width="full"
            >
              <CardBody textAlign="center" py={8}>
                <FiZap
                  size={48}
                  color="#4FD1C7"
                  style={{ marginBottom: "16px" }}
                />
                <Heading size="md" color="white" mb={3}>
                  今すぐ
                  <Box
                    as="span"
                    bgGradient="linear(to-r, teal.300, purple.300)"
                    bgClip="text"
                    display="inline"
                  >
                    AiSty
                  </Box>
                  を使う
                </Heading>
                <Text fontSize="sm" color="gray.300" mb={6}>
                  登録するとすぐに使える！
                </Text>
                <Button
                  as={NextLink}
                  href="/sign-in"
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  leftIcon={<FiZap size={16} />}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
                  }}
                  transition="all 0.3s ease"
                >
                  バーチャル試着を始める
                </Button>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Container>

      {/* 装飾的要素 */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        border="1px solid"
        borderColor="teal.500"
        opacity="0.1"
        animation="pulse 6s ease-in-out infinite"
        display={{ base: "none", xl: "block" }}
      />

      <Box
        position="absolute"
        bottom="10%"
        left="5%"
        width="200px"
        height="200px"
        borderRadius="full"
        bg="purple.500"
        opacity="0.05"
        animation="float 8s ease-in-out infinite"
        display={{ base: "none", xl: "block" }}
      />
    </Box>
  );
};
