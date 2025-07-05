import { Flex, HStack, Spacer } from "@chakra-ui/react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/atoms/Button"
import { Box } from "@/components/ui/atoms/Box"
import { Heading } from "@/components/ui/atoms/Heading"
import { Image } from "@/components/ui/atoms/Image"

export const Header = () => {
  return (
    <Flex as="header" p={4} bg="gray.900" borderBottom="1px" borderColor="gray.700" alignItems="center" boxShadow="lg">
      <HStack>
        <Image
          src="/images/image.png"
          boxSize="60px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />
        <Heading as="h2" size="lg" color="white" fontWeight="bold">
          仮装試着サービス
        </Heading>
      </HStack>
      <Spacer />
      <Box>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Flex gap={3} alignItems="center">
            <SignInButton>
              <Button
                variant="ghost"
                color="gray.300"
                size="md"
                _hover={{ bg: "gray.800", color: "white" }}
                border="1px"
                borderColor="gray.600"
              >
                ログイン
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button bg="teal.500" color="white" size="md" _hover={{ bg: "teal.400" }} boxShadow="md">
                新規登録
              </Button>
            </SignUpButton>
          </Flex>
        </SignedOut>
      </Box>
    </Flex>
  )
}
