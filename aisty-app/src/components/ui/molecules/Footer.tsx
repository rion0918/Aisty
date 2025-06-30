import { Container, VStack, SimpleGrid } from "@chakra-ui/react"
import { Box } from "@/components/ui/atoms/Box"
import { Text } from "@/components/ui/atoms/Text"
import { Heading } from "@/components/ui/atoms/Heading"

export const Footer = () => {
  return (
    <Box as="footer" bg="black" color="white" borderTop="1px" borderColor="gray.800">
      <Container maxW="container.lg" py={12}>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
          {/* サービス情報 */}
          <VStack align="start" gap={4}>
            <Heading as="h3" size="md" color="white">
              AiSty
            </Heading>
            <Text fontSize="sm" color="gray.400" lineHeight="1.6">
              AIを活用した仮想試着サービス
              <br />
              あなたにぴったりのスタイルを見つけましょう
            </Text>
          </VStack>

          {/* サービス */}
          <VStack align="start" gap={3}>
            <Heading as="h4" size="sm" color="gray.300">
              サービス
            </Heading>
            <VStack align="start" gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                仮想試着
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                スタイル提案
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                サイズガイド
              </Text>
            </VStack>
          </VStack>

          {/* サポート */}
          <VStack align="start" gap={3}>
            <Heading as="h4" size="sm" color="gray.300">
              サポート
            </Heading>
            <VStack align="start" gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                ヘルプセンター
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                お問い合わせ
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                よくある質問
              </Text>
            </VStack>
          </VStack>

          {/* 法的情報 */}
          <VStack align="start" gap={3}>
            <Heading as="h4" size="sm" color="gray.300">
              法的情報
            </Heading>
            <VStack align="start" gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                利用規約
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                プライバシーポリシー
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "teal.400" }}
                transition="color 0.2s"
              >
                特定商取引法
              </Text>
            </VStack>
          </VStack>
        </SimpleGrid>

        {/* コピーライト */}
        <Box borderTop="1px" borderColor="gray.800" mt={8} pt={6}>
          <Text textAlign="center" fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} AiSty. All Rights Reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
