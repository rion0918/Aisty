"use client"

import { Container, VStack, chakra } from "@chakra-ui/react"
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/atoms/Button"
import { Text } from "@/components/ui/atoms/Text"
import { Heading } from "@/components/ui/atoms/Heading"
import { Box } from "@/components/ui/atoms/Box"
import { Header } from "@/components/ui/molecules/Header"
import { Footer } from "@/components/ui/molecules/Footer"
import { FeatureSection } from "@/components/ui/organisms/FeatureSection"

const Video = chakra("video")

export default function Home() {
  return (
    <Box bg="black" minH="100vh" position="relative">
      <Header />
      <Box as="main" position="relative">
        {/* ヒーローセクション */}
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

              <SignedOut>
                <VStack gap={4} pt={6} align="start" width="100%">
                  <SignUpButton>
                    <Button
                      bgGradient="linear(to-r, teal.500, teal.400)"
                      color="belue.50"
                      size="lg"
                      px={12}
                      py={6}
                      fontSize="lg"
                      fontWeight="semibold"
                      borderRadius="full"
                      _hover={{
                        bgGradient: "linear(to-r, teal.400, teal.300)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(56, 178, 172, 0.4)",
                      }}
                      transition="all 0.3s ease"
                      boxShadow="0 6px 20px rgba(56, 178, 172, 0.3)"
                      minW="280px"
                    >
                      今すぐアイスティーで試着体験
                    </Button>
                  </SignUpButton>

                  <SignInButton>
                    <Button
                      variant="ghost"
                      color="gray.300"
                      size="lg"
                      px={8}
                      py={4}
                      fontSize="md"
                      border="1px solid"
                      borderColor="gray.600"
                      bg="rgba(0,0,0,0.3)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        bg: "rgba(55, 65, 81, 0.6)",
                        color: "white",
                        borderColor: "gray.400",
                        transform: "translateY(-1px)",
                      }}
                      transition="all 0.2s ease"
                    >
                      すでにアカウントをお持ちの方
                    </Button>
                  </SignInButton>
                </VStack>
              </SignedOut>

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

        {/* 動画セクション - 機能説明と組み合わせ */}
        <Box bg="gray.900" py={20} position="relative">
          <Container maxW="container.lg">
            <VStack gap={12} textAlign="center">
              <Heading as="h2" size="xl" color="white" mb={4}>
                使用例
              </Heading>

              {/* 動画デモセクション */}
              <Box
                position="relative"
                width="100%"
                maxW="800px"
                aspectRatio="16/9"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
                border="1px solid"
                borderColor="gray.700"
              >
                <Video
                  controls
                  poster="/placeholder.svg?height=450&width=800"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                </Video>

                {/* 再生ボタンオーバーレイ */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="80px"
                  height="80px"
                  borderRadius="full"
                  bg="rgba(56, 178, 172, 0.9)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  _hover={{
                    bg: "teal.500",
                    transform: "translate(-50%, -50%) scale(1.1)",
                  }}
                  transition="all 0.3s ease"
                  onClick={(e) => {
                    const video = e.currentTarget.parentElement?.querySelector("video")
                    if (video) {
                      video.play()
                      e.currentTarget.style.display = "none"
                    }
                  }}
                >
                  <Box
                    width="0"
                    height="0"
                    borderLeft="20px solid white"
                    borderTop="12px solid transparent"
                    borderBottom="12px solid transparent"
                    ml="4px"
                  />
                </Box>
              </Box>

              <Text fontSize="lg" color="gray.300" maxW="600px">
                AiStyで、あなたの衣服購入をサポートさせてください。
              </Text>
            </VStack>
          </Container>
        </Box>

        <FeatureSection />
      </Box>
      <Footer />
    </Box>
  )
}
