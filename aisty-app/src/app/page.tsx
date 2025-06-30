import { Container, VStack } from "@chakra-ui/react";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { Heading } from "@/components/ui/atoms/Heading";
import { Box } from "@/components/ui/atoms/Box";
import { Header } from "@/components/ui/molecules/Header";
import { Footer } from "@/components/ui/molecules/Footer";
import { FeatureSection } from "@/components/ui/organisms/FeatureSection";

export default function Home() {
  return (
    <Box>
      <Header />
      <Box as="main">
        <Container maxW="container.lg" py={20}>
          <VStack gap={8} textAlign="center">
            <Heading as="h1" size="3xl">
              Focus on what matters
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Aisty is the simplest way to manage your personal and professional tasks. Get more done, without the stress.
            </Text>
            <SignedOut>
              <VStack gap={4}>
                <SignUpButton>
                  <Button colorScheme="teal" size="lg">すぐに始める</Button>
                </SignUpButton>
                <SignInButton>
                  <Button variant="ghost" colorScheme="gray" size="lg">Already have an account? Sign In</Button>
                </SignInButton>
              </VStack>
            </SignedOut>
          </VStack>
        </Container>
        <FeatureSection />
      </Box>
      <Footer />
    </Box>
  );
}