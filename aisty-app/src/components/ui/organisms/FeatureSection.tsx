import React from "react";
import { Box, Heading, SimpleGrid, VStack, Container } from "@chakra-ui/react";
import { Text } from "@/components/ui/atoms/Text/text";

export const FeatureSection = () => {
  return (
    <Box as="section" py={24} bg="black" position="relative">
      {/* 背景装飾 */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgGradient="radial(ellipse at center, rgba(56, 178, 172, 0.03) 0%, transparent 70%)"
        zIndex="0"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        {/* 統計セクション */}
        <Box mt={20} textAlign="center">
          <Heading size="lg" color="white" mb={8}>
            About AiSty(テスト版)
          </Heading>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            <VStack spacing={2}>
              <Heading size="2xl" color="teal.300">
                90%
              </Heading>
              <Text color="gray.400">ユーザー満足度(身内集計)</Text>
            </VStack>

            <VStack spacing={2}>
              <Heading size="2xl" color="purple.300">
                39回
              </Heading>
              <Text color="gray.400">試着回数</Text>
            </VStack>

            <VStack spacing={2}>
              <Heading size="2xl" color="blue.300">
                15秒
              </Heading>
              <Text color="gray.400">平均処理時間</Text>
            </VStack>

            <VStack spacing={2}>
              <Heading size="2xl" color="green.300">
                24時間
              </Heading>
              <Text color="gray.400">いつでも利用可能(トークン尽きる限り)</Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
