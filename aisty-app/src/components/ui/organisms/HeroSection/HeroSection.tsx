'use client'

import { Container, VStack, chakra } from "@chakra-ui/react"
import { Text } from "@/components/ui/atoms/Text"
import { Heading } from "@/components/ui/atoms/Heading"
import { Box } from "@/components/ui/atoms/Box"
import { AuthButtons } from "@/components/ui/molecules/AuthButtons/AuthButtons"

const Video = chakra("video")

export const HeroSection = () => {
  return (
    <Box position="relative" minH="100vh" display="flex" alignItems="center">
      {/* 背景動画 - 控えめで効果的 */}
      <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="0" overflow="hidden">
        {/* メイン背景動画 - 右側に配置、控えめに */}
        <Box position="absolute" top="0" right="0" width="50%" height="100%" opacity="0.15" overflow="hidden">
          <Video
            autoPlay
            muted
            loop
            playsInline
            width="100%"
            height="100%"
            objectFit="cover"
            filter="brightness(1.6) blur(1px)"
            style={{ transform: "scale(1.1)" }}
          >
            <source src="/images/douga.mp4" type="video/mp4" />
          </Video>
        </Box>

        {/* 上下のグラデーション */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="20%"
          bgGradient="linear(to-b, black 0%, transparent 100%)"
          zIndex="1"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          height="20%"
          bgGradient="linear(to-t, black 0%, transparent 100%)"
          zIndex="1"
        />
      </Box>

      {/* メインコンテンツ - 可読性重視 */}
      <Container maxW="container.lg" position="relative" zIndex="2">
        <VStack gap={8} align="start" maxW="600px">
          <Heading
            as="h1"
            size="3xl"
            lineHeight="1.1"
            color="white"
            textShadow="2px 2px 8px rgba(0,0,0,0.9)"
            fontWeight="bold"
          >
            衣服はバーチャルで着る時代。
            <br />
            <Box as="span" bgGradient="linear(to-r, teal.400, purple.400)" bgClip="text" display="inline">
              自宅で見つけよう
            </Box>
          </Heading>

          <Text
            fontSize="xl"
            lineHeight="1.7"
            color="gray.200"
            textShadow="1px 1px 4px rgba(0,0,0,0.8)"
            maxW="500px"
          >
            AiStyは、AI技術であなたのStyleをサポート。
            <br />
            実際に着てみたような試着体験で、服選びの失敗をなくし、お気に入りの衣服を見つけましょう。
          </Text>

          <AuthButtons />

          <Text
            fontSize="sm"
            color="gray.400"
            mt={4}
            bg="rgba(0,0,0,0.4)"
            px={4}
            py={2}
            borderRadius="md"
            backdropFilter="blur(5px)"
            border="1px solid"
            borderColor="gray.700"
          >
            ※ 会員登録は無料です。クレジットカード情報の入力は不要です。
          </Text>
        </VStack>

        {/* 右側の装飾的要素 - 控えめに */}
        <Box
          position="absolute"
          top="20%"
          right="10%"
          width="200px"
          height="200px"
          borderRadius="full"
          border="1px solid"
          borderColor="teal.500"
          opacity="0.1"
          animation="pulse 4s ease-in-out infinite"
          display={{ base: "none", lg: "block" }}
        />

        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="100px"
          height="100px"
          borderRadius="full"
          bg="purple.500"
          opacity="0.05"
          animation="float 6s ease-in-out infinite"
          display={{ base: "none", lg: "block" }}
        />
      </Container>
    </Box>
  )
}
