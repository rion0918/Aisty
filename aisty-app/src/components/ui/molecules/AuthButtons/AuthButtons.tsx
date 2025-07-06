'use client'

import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs"
import { VStack } from "@chakra-ui/react"
import { Button } from "@/components/ui/atoms/Button"

export const AuthButtons = () => {
  return (
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
  )
}
