import type React from "react"
import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { Text } from "@/components/ui/atoms/Text"
import { FcCamera, FcApproval, FcCustomerSupport } from "react-icons/fc"

type FeatureProps = {
  title: string
  text: string
  icon: React.ReactNode
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack
      gap={4}
      textAlign="center"
      p={8}
      borderRadius="xl"
      bg="gray.900"
      border="1px"
      borderColor="gray.700"
      _hover={{
        borderColor: "teal.500",
        transform: "translateY(-4px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      }}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        bg: "linear-gradient(90deg, teal.500, purple.500)",
        opacity: 0,
        _groupHover: { opacity: 1 },
      }}
      role="group"
    >
      <Box fontSize="4xl" filter="brightness(1.2)">
        {icon}
      </Box>
      <Heading as="h3" size="md" color="white">
        {title}
      </Heading>
      <Text color="gray.400" lineHeight="1.6">
        {text}
      </Text>
    </VStack>
  )
}

export const FeatureSection = () => {
  return (
    <Box as="section" py={20} bg="black">
      <VStack gap={4} textAlign="center" mb={12}>
        <Heading as="h2" size="xl" color="white">
          AiStyの特徴
        </Heading>
        <Text fontSize="lg" color="gray.400" maxW="2xl">
          最新のAI技術で、あなたのオンラインショッピング体験を革新します
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} maxW="6xl" mx="auto" px={4}>
        <Feature
          icon={<FcCamera />}
          title="リアルな試着体験"
          text="高精度なAI技術により、実際に着用したような自然な試着体験を提供。サイズ感や着心地まで事前に確認できます。"
        />
        <Feature
          icon={<FcApproval />}
          title="パーソナライズ提案"
          text="あなたの体型や好みを学習し、最適なサイズとスタイルを提案。失敗のないお買い物をサポートします。"
        />
        <Feature
          icon={<FcCustomerSupport />}
          title="安心のサポート"
          text="専門スタッフによる丁寧なサポートと、万が一の場合の返品・交換保証で、安心してお買い物いただけます。"
        />
      </SimpleGrid>
    </Box>
  )
}
