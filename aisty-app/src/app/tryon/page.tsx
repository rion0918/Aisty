"use client";

import { Box } from "@/components/ui/atoms/Box";
import { Heading } from "@/components/ui/atoms/Heading";
import { Container, Button, Input, VStack, Image, Text, Stack } from "@chakra-ui/react";
import { useState, useRef } from "react";

export default function TryOnPage() {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImagePreview, setModelImagePreview] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [garmentImagePreview, setGarmentImagePreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setModelImage(file);
      setModelImagePreview(URL.createObjectURL(file));
    } else {
      setModelImage(null);
      setModelImagePreview(null);
    }
  };

  const handleGarmentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGarmentImage(file);
      setGarmentImagePreview(URL.createObjectURL(file));
    } else {
      setGarmentImage(null);
      setGarmentImagePreview(null);
    }
  };

  const handleTryOn = async () => {
    if (!modelImage || !garmentImage) {
      setError("人物と衣服の画像を両方選択してください。");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);
    setPredictionId(null);
    setStatus(null);

    const formData = new FormData();
    formData.append("modelImage", modelImage);
    formData.append("garmentImage", garmentImage);

    try {
      // 1) ジョブ起動: predictionId を受け取る
      const response = await fetch("/api/tryon", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong with the try-on request.");
      }

      const data = await response.json();
      const id = data.id as string;
      setPredictionId(id);

      // 2) ステータスをポーリング
      await new Promise<void>((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            const res = await fetch(`/api/tryon?id=${id}`);
            if (!res.ok) {
              const e = await res.json();
              throw new Error(e.error || "Failed to get status");
            }
            const sdata = await res.json();
            setStatus(sdata.status);

            if (sdata.status === "completed") {
              clearInterval(interval);
              setResultImage(sdata.resultImageUrl ?? null);
              resolve();
            }
            if (sdata.status === "failed" || sdata.status === "canceled") {
              clearInterval(interval);
              reject(new Error(sdata.error || `Job ${sdata.status}`));
            }
          } catch (err) {
            clearInterval(interval);
            reject(err);
          }
        }, 3000);
      });
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
      <Box as="main" minH="calc(100vh - 138px)">
        <Container maxW="container.lg" py={20}>
          <Heading as="h1" size="2xl" textAlign="center" mb={10}>
            アイスティーで着てみる
          </Heading>

          <VStack gap={8} align="center">
            <Stack direction={{ base: "column", md: "row" }} gap={8} mb={8}>
              <Box flex="1" width="full">
                <Text mb={2}>人物画像:</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleModelImageChange}
                  ref={modelInputRef}
                  display="none"
                />
                <Button onClick={() => modelInputRef.current?.click()} colorScheme="teal" variant="outline" width="full">
                  全身写真を選択
                </Button>
                {modelImagePreview && (
                  <Box mt={2} p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Image src={modelImagePreview} alt="Model Preview" maxH="200px" objectFit="contain" />
                  </Box>
                )}
              </Box>
              <Box flex="1" width="full">
                <Text mb={2}>衣服画像:</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleGarmentImageChange}
                  ref={garmentInputRef}
                  display="none"
                />
                <Button onClick={() => garmentInputRef.current?.click()} colorScheme="teal" variant="outline" width="full">
                  服の写真を選択
                </Button>
                {garmentImagePreview && (
                  <Box mt={2} p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Image src={garmentImagePreview} alt="Garment Preview" maxH="200px" objectFit="contain" />
                  </Box>
                )}
              </Box>
            </Stack>
            <Button onClick={handleTryOn} loading={loading} loadingText="着せ替え中..." colorScheme="blue" size="lg" width="full" maxW="sm" mt={4}>
              Try On
            </Button>

            {error && (
              <Text color="red.500" mt={4}>
                Error: {error}
              </Text>
            )}

            {status && !resultImage && (
              <Text mt={4}>現在のステータス: {status}</Text>
            )}

            {predictionId && (
              <Text mt={2} fontSize="sm" color="gray.500">ジョブID: {predictionId}</Text>
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
