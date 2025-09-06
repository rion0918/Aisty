"use client";

import {
  Container,
  VStack,
  chakra,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Text } from "@/components/ui/atoms/Text/text";
import { Heading } from "@/components/ui/atoms/Heading/heading";
import { Box } from "@/components/ui/atoms/Box/box";
import {
  FiPlay,
  FiUpload,
  FiZap,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import NextLink from "next/link";

const Video = chakra("video");

export const UsageExampleSection = () => {
  return (
    <Box bg="gray.900" py={24} position="relative">
      {/* 背景グラデーション */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgGradient="radial(ellipse at center, rgba(128, 90, 213, 0.05) 0%, transparent 70%)"
        zIndex="0"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        <VStack spacing={16} textAlign="center">
          {/* ヘッダーセクション */}
          <VStack spacing={6}>
            <Badge
              colorScheme="purple"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              🎬 試着までの流れ
            </Badge>

            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              color="white"
              fontWeight="bold"
            >
              たった
              <Box
                as="span"
                bgGradient="linear(to-r, purple.300, pink.300)"
                bgClip="text"
                mx={2}
              >
                3ステップ
              </Box>
              で完了
            </Heading>
          </VStack>

          {/* ステップガイド */}
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={8}
            width="full"
            maxW="4xl"
          >
            <Card
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="gray.800"
            >
              <CardBody p={8} textAlign="center">
                <VStack spacing={4}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="rgba(128, 90, 213, 0.1)"
                    border="1px solid"
                    borderColor="purple.700"
                  >
                    <FiUpload size={32} color="#B794F6" />
                  </Box>

                  <VStack spacing={2}>
                    <Badge colorScheme="purple" borderRadius="full">
                      STEP 1
                    </Badge>
                    <Heading size="md" color="white">
                      画像をアップロード
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      あなたの全身写真と試着したい衣服の画像をドラッグ&ドロップ
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="gray.800"
            >
              <CardBody p={8} textAlign="center">
                <VStack spacing={4}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="rgba(56, 178, 172, 0.1)"
                    border="1px solid"
                    borderColor="teal.700"
                  >
                    <FiZap size={32} color="#4FD1C7" />
                  </Box>

                  <VStack spacing={2}>
                    <Badge colorScheme="teal" borderRadius="full">
                      STEP 2
                    </Badge>
                    <Heading size="md" color="white">
                      AI処理を開始
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      ボタンをクリックするだけで、AIが自動的に高品質な試着画像を生成
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="gray.800"
            >
              <CardBody p={8} textAlign="center">
                <VStack spacing={4}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="rgba(34, 197, 94, 0.1)"
                    border="1px solid"
                    borderColor="green.700"
                  >
                    <FiDownload size={32} color="#68D391" />
                  </Box>

                  <VStack spacing={2}>
                    <Badge colorScheme="green" borderRadius="full">
                      STEP 3
                    </Badge>
                    <Heading size="md" color="white">
                      結果を確認・保存
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      生成された試着画像を確認し、気に入ったらダウンロード保存
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* デモ動画セクション */}
          <VStack spacing={8}>
            <Heading size="lg" color="white">
              実際の使用デモ
            </Heading>

            <Box
              position="relative"
              width="100%"
              maxW="900px"
              aspectRatio="16/9"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="0 25px 80px rgba(0,0,0,0.6)"
              border="1px solid"
              borderColor="gray.700"
              bg="gray.800"
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

              {/* カスタム再生ボタン */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="100px"
                height="100px"
                borderRadius="full"
                bg="rgba(56, 178, 172, 0.95)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{
                  bg: "teal.500",
                  transform: "translate(-50%, -50%) scale(1.1)",
                  boxShadow: "0 0 30px rgba(56, 178, 172, 0.5)",
                }}
                transition="all 0.3s ease"
                onClick={(e) => {
                  const video =
                    e.currentTarget.parentElement?.querySelector("video");
                  if (video) {
                    video.play();
                    e.currentTarget.style.display = "none";
                  }
                }}
              >
                <FiPlay size={40} color="white" style={{ marginLeft: "4px" }} />
              </Box>

              {/* 動画情報オーバーレイ */}
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p={6}
                bgGradient="linear(to-t, rgba(0,0,0,0.8) 0%, transparent 100%)"
              >
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text color="white" fontWeight="semibold">
                      Aisty デモ動画
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      実際の試着プロセスをご覧ください
                    </Text>
                  </VStack>
                  <Badge colorScheme="teal">2:30</Badge>
                </Flex>
              </Box>
            </Box>
          </VStack>

          {/* CTA セクション */}
          <VStack spacing={6} mt={12}>
            <Text fontSize="xl" color="gray.300" maxW="600px">
              見るより体験する方が早い。今すぐ無料で試してみませんか？
            </Text>

            <Button
              as={NextLink}
              href="/sign-in"
              size="lg"
              colorScheme="teal"
              rightIcon={<FiArrowRight size={16} />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
              }}
              transition="all 0.3s ease"
            >
              今すぐ無料で試着体験
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};
