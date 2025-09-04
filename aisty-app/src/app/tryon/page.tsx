"use client";

import { Box } from "@/components/ui/atoms/Box";
import { Heading } from "@/components/ui/atoms/Heading";
import {
  Container,
  Button,
  Input,
  VStack,
  Image,
  Text,
  Progress,
  Badge,
  Flex,
  useToast,
  SimpleGrid,
  AspectRatio,
  Card,
  CardBody,
  Checkbox,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  FiUpload,
  FiUser,
  FiZap,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { TbShirt } from "react-icons/tb";

export default function TryOnPage() {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImagePreview, setModelImagePreview] = useState<string | null>(
    null
  );

  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [garmentImagePreview, setGarmentImagePreview] = useState<string | null>(
    null
  );
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultImageSrc, setResultImageSrc] = useState<string | null>(null);
  const [usedProxyForResult, setUsedProxyForResult] = useState<boolean>(false);
  const [variantLabel, setVariantLabel] = useState<string>("");
  type HistoryItem = {
    id: string;
    prediction_id: string;
    result_image_url: string | null;
    output_image_url?: string | null;
    label: string | null;
    created_at: string;
  };
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<
    "upload" | "processing" | "completed"
  >("upload");
  const modelInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<"model" | "garment" | null>(null);
  const toast = useToast();

  // Keep a derived image src that can fall back to a proxy if direct load fails
  useEffect(() => {
    if (resultImage) {
      setResultImageSrc(resultImage);
      setUsedProxyForResult(false);
    } else {
      setResultImageSrc(null);
      setUsedProxyForResult(false);
    }
  }, [resultImage]);

  // Fetch history (for the logged-in user)
  const fetchHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);
      const res = await fetch("/api/history");
      if (!res.ok) throw new Error("履歴の取得に失敗しました");
      const data = await res.json();
      setHistory(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      console.error(e);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Refresh history when a run completes
  useEffect(() => {
    if (currentStep === "completed") {
      fetchHistory();
    }
  }, [currentStep, fetchHistory]);

  const toggleSelect = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) {
        toast({
          title: "比較は最大4件まで",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  const validateImageFile = useCallback(
    (file: File): boolean => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "無効なファイル形式",
          description: "JPEG、PNG、WebP形式の画像をアップロードしてください。",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      if (file.size > maxSize) {
        toast({
          title: "ファイルサイズが大きすぎます",
          description: "10MB以下の画像をアップロードしてください。",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      return true;
    },
    [toast]
  );

  const handleModelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateImageFile(file)) {
        setModelImage(file);
        setModelImagePreview(URL.createObjectURL(file));
        toast({
          title: "人物画像をアップロードしました",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      setModelImage(null);
      setModelImagePreview(null);
    }
  };

  const handleGarmentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateImageFile(file)) {
        setGarmentImage(file);
        setGarmentImagePreview(URL.createObjectURL(file));
        toast({
          title: "衣服画像をアップロードしました",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      setGarmentImage(null);
      setGarmentImagePreview(null);
    }
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent, type: "model" | "garment") => {
      e.preventDefault();
      setDragOver(type);
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, type: "model" | "garment") => {
      e.preventDefault();
      setDragOver(null);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        if (validateImageFile(file)) {
          if (type === "model") {
            setModelImage(file);
            setModelImagePreview(URL.createObjectURL(file));
          } else {
            setGarmentImage(file);
            setGarmentImagePreview(URL.createObjectURL(file));
          }
          toast({
            title: `${
              type === "model" ? "人物" : "衣服"
            }画像をアップロードしました`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    },
    [toast, validateImageFile]
  );

  const handleTryOn = async () => {
    if (!modelImage || !garmentImage) {
      toast({
        title: "画像が不足しています",
        description: "人物と衣服の画像を両方選択してください。",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);
    setResultImageSrc(null);
    setUsedProxyForResult(false);
    setPredictionId(null);
    setStatus(null);
    setProgress(0);
    setCurrentStep("processing");

    const formData = new FormData();
    formData.append("modelImage", modelImage);
    formData.append("garmentImage", garmentImage);
    if (variantLabel.trim()) {
      formData.append("label", variantLabel.trim());
    }

    try {
      // 1) 画像アップロード段階
      setProgress(20);
      setStatus("画像をアップロード中...");

      const response = await fetch("/api/tryon", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Something went wrong with the try-on request."
        );
      }

      const data = await response.json();
      const id = data.id as string;
      setPredictionId(id);
      setProgress(40);
      setStatus("AI処理を開始しています...");

      // 2) ステータスをポーリング（重複呼び出しを避けるため逐次）
      let progressValue = 40;
      let done = false;
      while (!done) {
        const res = await fetch(`/api/tryon?id=${id}`);
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw new Error(e.error || "Failed to get status");
        }
        const sdata = await res.json();
        setStatus(sdata.status === "processing" ? "AI処理中..." : sdata.status);

        if (sdata.status === "processing") {
          progressValue = Math.min(progressValue + 5, 90);
          setProgress(progressValue);
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }

        if (sdata.status === "completed") {
          setProgress(100);
          setCurrentStep("completed");
          setResultImage(sdata.resultImageUrl ?? null);
          toast({
            title: "試着完了！",
            description: "バーチャル試着が完了しました。",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          done = true;
          break;
        }
        if (sdata.status === "failed" || sdata.status === "canceled") {
          throw new Error(
            sdata.error ||
              `処理が${
                sdata.status === "failed" ? "失敗" : "キャンセル"
              }されました`
          );
        }
        // 一時的な未知のステータスでも控えめに待機
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (err: unknown) {
      setCurrentStep("upload");
      setProgress(0);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      toast({
        title: "エラーが発生しました",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setModelImage(null);
    setModelImagePreview(null);
    setGarmentImage(null);
    setGarmentImagePreview(null);
    setResultImage(null);
    setPredictionId(null);
    setStatus(null);
    setProgress(0);
    setCurrentStep("upload");
    setError(null);
    setVariantLabel("");
  };

  const downloadResult = () => {
    const src = resultImageSrc ?? resultImage;
    if (src) {
      const link = document.createElement("a");
      link.href = src;
      link.download = "aisty-tryon-result.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Box>
      <Box
        as="main"
        minH="calc(100vh - 138px)"
        pt={{ base: "100px", md: "120px" }}
      >
        <Container maxW="container.lg" py={8}>
          <VStack spacing={4} mb={12}>
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              bgGradient="linear(to-r, teal.400, purple.500)"
              bgClip="text"
            >
              バーチャル試着
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center" maxW="2xl">
              AIの力で、実際に着用したような自然な試着体験を。
              あなたの写真と気になる衣服を組み合わせて、購入前に着用イメージを確認できます。
            </Text>
          </VStack>

          <VStack gap={8} align="center">
            {/* プログレスインジケーター */}
            {loading && (
              <Box width="full" maxW="md" mb={8}>
                <Flex align="center" justify="space-between" mb={2}>
                  <Badge
                    colorScheme={
                      currentStep === "upload"
                        ? "blue"
                        : currentStep === "processing"
                        ? "orange"
                        : "green"
                    }
                  >
                    {currentStep === "upload"
                      ? "アップロード"
                      : currentStep === "processing"
                      ? "処理中"
                      : "完了"}
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    {progress}%
                  </Text>
                </Flex>
                <Progress
                  value={progress}
                  colorScheme="teal"
                  size="lg"
                  borderRadius="md"
                />
                {status && (
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    mt={2}
                    textAlign="center"
                  >
                    {status}
                  </Text>
                )}
              </Box>
            )}

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={8}
              width="full"
              maxW="4xl"
            >
              {/* 人物画像アップロード */}
              <Card>
                <CardBody>
                  <VStack spacing={4}>
                    <Flex align="center" gap={2}>
                      <FiUser size={20} color="#38B2AC" />
                      <Text fontWeight="semibold">人物画像</Text>
                    </Flex>

                    <Box
                      width="full"
                      height="300px"
                      border="2px dashed"
                      borderColor={
                        dragOver === "model"
                          ? "teal.400"
                          : modelImagePreview
                          ? "green.400"
                          : "gray.300"
                      }
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      bg={dragOver === "model" ? "teal.50" : "gray.50"}
                      transition="all 0.2s"
                      position="relative"
                      onClick={() => modelInputRef.current?.click()}
                      onDragOver={(e) => handleDragOver(e, "model")}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, "model")}
                      _hover={{ borderColor: "teal.400", bg: "teal.50" }}
                    >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleModelImageChange}
                        ref={modelInputRef}
                        display="none"
                      />

                      {modelImagePreview ? (
                        <AspectRatio ratio={3 / 4} width="full" height="full">
                          <Image
                            src={modelImagePreview}
                            alt="Model Preview"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        </AspectRatio>
                      ) : (
                        <VStack spacing={3} color="gray.500">
                          {dragOver === "model" ? (
                            <MdDragIndicator size={32} />
                          ) : (
                            <FiUpload size={32} />
                          )}
                          <Text textAlign="center" fontSize="sm">
                            {dragOver === "model"
                              ? "ここにドロップ"
                              : "クリックまたはドラッグ&ドロップ"}
                            <br />
                            <Text as="span" fontSize="xs" color="gray.400">
                              全身が写った写真をアップロード
                            </Text>
                          </Text>
                        </VStack>
                      )}
                    </Box>

                    {modelImagePreview && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setModelImage(null);
                          setModelImagePreview(null);
                        }}
                      >
                        削除
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>

              {/* 衣服画像アップロード */}
              <Card>
                <CardBody>
                  <VStack spacing={4}>
                    <Flex align="center" gap={2}>
                      <TbShirt size={20} color="#9F7AEA" />
                      <Text fontWeight="semibold">衣服画像</Text>
                    </Flex>

                    <Box
                      width="full"
                      height="300px"
                      border="2px dashed"
                      borderColor={
                        dragOver === "garment"
                          ? "purple.400"
                          : garmentImagePreview
                          ? "green.400"
                          : "gray.300"
                      }
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      bg={dragOver === "garment" ? "purple.50" : "gray.50"}
                      transition="all 0.2s"
                      position="relative"
                      onClick={() => garmentInputRef.current?.click()}
                      onDragOver={(e) => handleDragOver(e, "garment")}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, "garment")}
                      _hover={{ borderColor: "purple.400", bg: "purple.50" }}
                    >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleGarmentImageChange}
                        ref={garmentInputRef}
                        display="none"
                      />

                      {garmentImagePreview ? (
                        <AspectRatio ratio={3 / 4} width="full" height="full">
                          <Image
                            src={garmentImagePreview}
                            alt="Garment Preview"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        </AspectRatio>
                      ) : (
                        <VStack spacing={3} color="gray.500">
                          {dragOver === "garment" ? (
                            <MdDragIndicator size={32} />
                          ) : (
                            <FiUpload size={32} />
                          )}
                          <Text textAlign="center" fontSize="sm">
                            {dragOver === "garment"
                              ? "ここにドロップ"
                              : "クリックまたはドラッグ&ドロップ"}
                            <br />
                            <Text as="span" fontSize="xs" color="gray.400">
                              試着したい衣服の写真をアップロード
                            </Text>
                          </Text>
                        </VStack>
                      )}
                    </Box>

                    {/* カラー/バリアント名（任意） */}
                    <Input
                      placeholder="比較ジャンル名を入力(パーカー、シャツ)"
                      value={variantLabel}
                      onChange={(e) => setVariantLabel(e.target.value)}
                    />

                    {garmentImagePreview && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setGarmentImage(null);
                          setGarmentImagePreview(null);
                        }}
                      >
                        削除
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
            {/* アクションボタン */}
            <VStack spacing={4} mt={8}>
              <Button
                onClick={handleTryOn}
                isLoading={loading}
                loadingText="AI処理中..."
                colorScheme="teal"
                size="lg"
                width="full"
                maxW="md"
                leftIcon={<FiZap size={16} />}
                isDisabled={!modelImage || !garmentImage}
                _disabled={{
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                バーチャル試着を開始
              </Button>

              {(modelImage || garmentImage) && (
                <Button
                  onClick={resetAll}
                  variant="outline"
                  size="md"
                  leftIcon={<FiRefreshCw size={16} />}
                  isDisabled={loading}
                >
                  リセット
                </Button>
              )}
            </VStack>

            {/* 結果表示 */}
            {resultImageSrc && (
              <Box mt={12} width="full" maxW="2xl">
                <VStack spacing={6}>
                  <Heading
                    as="h2"
                    size="xl"
                    textAlign="center"
                    color="teal.600"
                  >
                    🎉 試着結果
                  </Heading>

                  <Card>
                    <CardBody>
                      <AspectRatio ratio={3 / 4}>
                        <Image
                          src={resultImageSrc ?? undefined}
                          alt="Try-on Result"
                          objectFit="contain"
                          onError={() => {
                            // Fallback to proxy once if direct loading fails (CORS/auth)
                            if (!usedProxyForResult && resultImage) {
                              setUsedProxyForResult(true);
                              const proxied = `/api/proxy-image?url=${encodeURIComponent(
                                resultImage
                              )}`;
                              setResultImageSrc(proxied);
                              toast({
                                title: "画像の読み込みに失敗しました",
                                description: "プロキシ経由で再読み込みします…",
                                status: "warning",
                                duration: 2500,
                                isClosable: true,
                              });
                            }
                          }}
                          borderRadius="md"
                        />
                      </AspectRatio>
                    </CardBody>
                  </Card>

                  <Flex gap={4} wrap="wrap" justify="center">
                    <Button
                      onClick={downloadResult}
                      leftIcon={<FiDownload size={16} />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      結果をダウンロード
                    </Button>

                    <Button
                      onClick={resetAll}
                      leftIcon={<FiRefreshCw size={16} />}
                      variant="outline"
                    >
                      新しく試着する
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            )}

            {predictionId && (
              <Text fontSize="xs" color="gray.400" mt={4}>
                処理ID: {predictionId}
              </Text>
            )}

            {/* 履歴 */}
            <Divider my={10} />
            <VStack align="stretch" spacing={4} width="full">
              <HStack justify="space-between">
                <Heading as="h2" size="lg">
                  履歴
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  {history.length} 件
                </Text>
              </HStack>

              {historyLoading ? (
                <Text color="gray.500">読み込み中...</Text>
              ) : history.length === 0 ? (
                <Text color="gray.500">まだ履歴がありません。</Text>
              ) : (
                <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
                  {history.map((item) => {
                    const isSelected = selectedForCompare.includes(item.id);
                    const resultUrl =
                      item.result_image_url || item.output_image_url || "";
                    const imgSrc = resultUrl
                      ? `/api/proxy-image?url=${encodeURIComponent(resultUrl)}`
                      : undefined;
                    return (
                      <Card
                        key={item.id}
                        variant={isSelected ? "filled" : "outline"}
                        onClick={() => toggleSelect(item.id)}
                        cursor="pointer"
                      >
                        <CardBody>
                          <VStack spacing={2} align="stretch">
                            <AspectRatio ratio={3 / 4}>
                              <Image
                                src={imgSrc}
                                alt={item.label ?? "result"}
                                objectFit="cover"
                                borderRadius="md"
                              />
                            </AspectRatio>
                            <HStack justify="space-between">
                              <Checkbox
                                isChecked={isSelected}
                                pointerEvents="none"
                              >
                                比較
                              </Checkbox>
                              <Text fontSize="xs" color="gray.500">
                                {item.label ?? "—"}
                              </Text>
                            </HStack>
                            <Text fontSize="xs" color="gray.400">
                              {new Date(item.created_at).toLocaleString()}
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    );
                  })}
                </SimpleGrid>
              )}

              <HStack>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => setShowCompare((v) => !v)}
                  isDisabled={selectedForCompare.length < 2}
                >
                  {showCompare ? "比較を隠す" : "選択した項目を比較"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedForCompare([])}
                >
                  選択をクリア
                </Button>
              </HStack>

              {showCompare && selectedForCompare.length >= 2 && (
                <VStack align="stretch" spacing={4} mt={2}>
                  <Heading as="h3" size="md">
                    比較
                  </Heading>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      md: Math.min(selectedForCompare.length, 4),
                    }}
                    gap={4}
                  >
                    {selectedForCompare.map((id) => {
                      const item = history.find((h) => h.id === id);
                      if (!item) return null;
                      const resultUrl =
                        item.result_image_url || item.output_image_url || "";
                      const imgSrc = resultUrl
                        ? `/api/proxy-image?url=${encodeURIComponent(
                            resultUrl
                          )}`
                        : undefined;
                      return (
                        <Card key={id}>
                          <CardBody>
                            <VStack spacing={2}>
                              <AspectRatio ratio={3 / 4} width="full">
                                <Image
                                  src={imgSrc}
                                  alt={item.label ?? "result"}
                                  objectFit="contain"
                                  borderRadius="md"
                                />
                              </AspectRatio>
                              <Text fontWeight="semibold">
                                {item.label ?? "—"}
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </SimpleGrid>
                </VStack>
              )}
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
