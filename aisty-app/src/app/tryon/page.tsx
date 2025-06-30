import { Box } from "@/components/ui/atoms/Box";
import { Heading } from "@/components/ui/atoms/Heading";
import { Header } from "@/components/ui/molecules/Header";
import { Footer } from "@/components/ui/molecules/Footer";
import { Container } from "@chakra-ui/react";

export default function TryOnPage() {
  return (
    <Box>
      <Header />
      <Box as="main" minH="calc(100vh - 138px)">
        <Container maxW="container.lg" py={20}>
          <Heading as="h1" size="2xl" textAlign="center">
            TryOn Page
          </Heading>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
