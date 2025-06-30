import { Container, VStack } from "@chakra-ui/react"
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/atoms/Button"
import { Text } from "@/components/ui/atoms/Text"
import { Heading } from "@/components/ui/atoms/Heading"
import { Box } from "@/components/ui/atoms/Box"
import { Header } from "@/components/ui/molecules/Header"
import { Footer } from "@/components/ui/molecules/Footer"
import { FeatureSection } from "@/components/ui/organisms/FeatureSection"

export default function Home() {
  return (
    <Box bg="black" minH="100vh">
      <Header />
      <Box as="main">
        <Container maxW="container.lg" py={20}>
          <VStack gap={8} textAlign="center">
            <Heading as="h1" size="3xl" lineHeight="1.2" color="white" textShadow="2px 2px 4px rgba(0,0,0,0.3)">
              あなたにぴったりの服を、
              <br />
              <Box as="span" bgGradient="linear(to-r, teal.400, purple.400)" bgClip="text">
                自宅で見つけよう
              </Box>
            </Heading>
            <Text fontSize="xl" maxW="2xl" lineHeight="1.8" color="gray.300">
              最新のAI技術で、オンラインショッピングが変わります。
              実際に着てみたような試着体験で、サイズ選びの失敗をなくし、 お気に入りのスタイルを見つけましょう。
            </Text>
            <SignedOut>
              <VStack gap={4} pt={4}>
                <SignUpButton>
                  <Button
                    bgGradient="linear(to-r, teal.500, teal.400)"
                    color="gray.900"
                    size="lg"
                    px={10}
                    py={6}
                    fontSize="lg"
                    borderRadius="full"
                    _hover={{
                      bgGradient: "linear(to-r, teal.400, teal.300)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
                    }}
                    transition="all 0.3s ease"
                    boxShadow="0 4px 15px rgba(56, 178, 172, 0.2)"
                  >
                    今すぐ無料で試着体験
                  </Button>
                </SignUpButton>
                <SignInButton>
                  <Button
                    variant="ghost"
                    color="gray.400"
                    size="lg"
                    px={6}
                    py={4}
                    border="1px"
                    borderColor="gray.600"
                    _hover={{
                      bg: "gray.800",
                      color: "white",
                      borderColor: "gray.500",
                    }}
                  >
                    すでにアカウントをお持ちの方
                  </Button>
                </SignInButton>
              </VStack>
            </SignedOut>
            <Text fontSize="sm" color="gray.500" mt={4}>
              ※ 会員登録は無料です。クレジットカード情報の入力は不要です。
            </Text>
          </VStack>
        </Container>
        <FeatureSection />
      </Box>
      <Footer />
    </Box>
  )
}
