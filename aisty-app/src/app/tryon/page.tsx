"use client";

import { Box } from "@/components/ui/atoms/Box";
import { Heading } from "@/components/ui/atoms/Heading";
import { Header } from "@/components/ui/molecules/Header";
import { Container, Button, Input, VStack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function TryOnPage() {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTryOn = async () => {
    if (!modelImage || !garmentImage) {
      setError("Please select both a model image and a garment image.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    const formData = new FormData();
    formData.append("modelImage", modelImage);
    formData.append("garmentImage", garmentImage);

    try {
      const response = await fetch("/api/tryon", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong with the try-on request.");
      }

      const data = await response.json();
      setResultImage(data.resultImageUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Header />
      <Box as="main" minH="calc(100vh - 138px)">
        <Container maxW="container.lg" py={20}>
          <Heading as="h1" size="2xl" textAlign="center" mb={10}>
            Virtual Try-On
          </Heading>

          <VStack gap={4} align="stretch">
            <Box>
              <Text mb={2}>Upload Your Photo:</Text>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setModelImage(e.target.files ? e.target.files[0] : null)}
              />
            </Box>
            <Box>
              <Text mb={2}>Upload Garment Photo:</Text>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setGarmentImage(e.target.files ? e.target.files[0] : null)}
              />
            </Box>
            <Button onClick={handleTryOn} loading={loading} colorScheme="blue" size="lg">
              Try On
            </Button>

            {error && (
              <Text color="red.500" mt={4}>
                Error: {error}
              </Text>
            )}

            {resultImage && (
              <Box mt={8} textAlign="center">
                <Heading as="h2" size="xl" mb={4}>
                  Try-On Result
                </Heading>
                <Image src={resultImage} alt="Try-on Result" maxW="full" />
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
