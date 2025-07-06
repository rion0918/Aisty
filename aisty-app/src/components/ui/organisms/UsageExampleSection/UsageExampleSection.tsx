'use client'

import { Container, VStack, chakra } from "@chakra-ui/react"
import { Text } from "@/components/ui/atoms/Text"
import { Heading } from "@/components/ui/atoms/Heading"
import { Box } from "@/components/ui/atoms/Box"

const Video = chakra("video")

export const UsageExampleSection = () => {
  return (
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
  )
}
