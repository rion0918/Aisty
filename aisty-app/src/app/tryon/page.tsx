"use client";

import { Box } from "@/components/ui/atoms/Box/box";
import { Heading } from "@/components/ui/atoms/Heading/heading";
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
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Keep a derived image src that can fall back to a proxy if direct load fails
  useEffect(() => {
    if (resultImage) {
      // Always use proxy for display to avoid inline-blocking headers or auth
      const proxied = `/api/proxy-image?url=${encodeURIComponent(resultImage)}`;
      setResultImageSrc(proxied);
    } else {
      setResultImageSrc(null);
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
      // 元の上限（10MB）に戻す
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
          duration: 4000,
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
        let message = "Something went wrong with the try-on request.";
        try {
          const ct = response.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const err = await response.json();
            message = err.error || message;
          } else {
            const text = await response.text();
            // Vercel等のプラットフォームでの 413 対応
            if (response.status === 413 || /entity too large/i.test(text)) {
              message =
                "アップロードサイズが大きすぎます（サーバー制限）。1枚2MB以下、全体も小さめにしてください。";
            } else {
              message = text || message;
            }
          }
        } catch {}
        throw new Error(message);
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
          // Scroll to result area on mobile for better visibility
          setTimeout(() => {
            resultRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 150);
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
    <Box bg="pink.50" minH="100vh">
      {/* 共通ヘッダーが見えにくい為、オーバーレイを以下に配置 */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="138px"
        bg="linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)"
        zIndex="999"
        pointerEvents="none"
      />
      <Box
        as="main"
        minH="calc(100vh - 138px)"
        pt={{ base: "100px", md: "120px" }}
        pb={{ base: "80px", md: 0 }}
      >
        <Container
          maxW="container.lg"
          py={{ base: 4, md: 8 }}
          px={{ base: 4, md: 8 }}
        >
          <VStack spacing={{ base: 6, md: 8 }} mb={{ base: 8, md: 12 }}>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              textAlign="center"
              bgGradient="linear(to-r, teal.400, purple.500)"
              bgClip="text"
              px={{ base: 2, md: 0 }}
            >
              バーチャル試着
            </Heading>
            <Box maxW={{ base: "full", md: "3xl" }} px={{ base: 4, md: 0 }}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                color="gray.700"
                mb={{ base: 3, md: 4 }}
                textAlign="center"
              >
                綺麗に試着するために
              </Text>

              <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                <Box>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="bold"
                    color="gray.800"
                    mb={{ base: 1, md: 2 }}
                  >
                    自分の写真をアップロード
                  </Text>
                  <VStack spacing={1} align="start" pl={{ base: 2, md: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      ・正面から、全身または上半身がしっかり写っている写真をご用意ください。
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      ・明るくて、服の形がはっきり見える写真がおすすめです。
                    </Text>
                  </VStack>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="bold"
                    color="gray.800"
                    mb={{ base: 1, md: 2 }}
                  >
                    試着したい服の写真をアップロード
                  </Text>
                  <VStack spacing={1} align="start" pl={{ base: 2, md: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      ・オンラインショップなどにある「平置きの服の画像」や「商品ページの画像」を使うと、より自然に合成できます。
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      ・Tシャツ・ワンピース・スカートなど、どんな服でもOKです。
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </VStack>

          <VStack gap={{ base: 6, md: 8 }} align="center">
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
              gap={{ base: 4, md: 8 }}
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
                      height={{ base: "250px", md: "300px" }}
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
                        capture="user"
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
                          {/* Icon: show drag indicator only on md+, upload icon on mobile */}
                          <Box display={{ base: "none", md: "block" }}>
                            {dragOver === "model" ? (
                              <MdDragIndicator size={32} />
                            ) : (
                              <FiUpload size={32} />
                            )}
                          </Box>
                          <Box display={{ base: "block", md: "none" }}>
                            <FiUpload size={32} />
                          </Box>
                          <Text
                            textAlign="center"
                            fontSize={{ base: "xs", md: "sm" }}
                          >
                            <Box
                              as="span"
                              display={{ base: "inline", md: "none" }}
                            >
                              タップしてアップロード
                            </Box>
                            <Box
                              as="span"
                              display={{ base: "none", md: "inline" }}
                            >
                              {dragOver === "model"
                                ? "ここにドロップ"
                                : "クリックまたはドラッグ&ドロップ"}
                            </Box>
                            <br />
                            <Text
                              as="span"
                              fontSize={{ base: "2xs", md: "xs" }}
                              color="gray.400"
                            >
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
                      height={{ base: "250px", md: "300px" }}
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
                        capture="environment"
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
                          {/* Icon: show drag indicator only on md+, upload icon on mobile */}
                          <Box display={{ base: "none", md: "block" }}>
                            {dragOver === "garment" ? (
                              <MdDragIndicator size={32} />
                            ) : (
                              <FiUpload size={32} />
                            )}
                          </Box>
                          <Box display={{ base: "block", md: "none" }}>
                            <FiUpload size={32} />
                          </Box>
                          <Text
                            textAlign="center"
                            fontSize={{ base: "xs", md: "sm" }}
                          >
                            <Box
                              as="span"
                              display={{ base: "inline", md: "none" }}
                            >
                              タップしてアップロード
                            </Box>
                            <Box
                              as="span"
                              display={{ base: "none", md: "inline" }}
                            >
                              {dragOver === "garment"
                                ? "ここにドロップ"
                                : "クリックまたはドラッグ&ドロップ"}
                            </Box>
                            <br />
                            <Text
                              as="span"
                              fontSize={{ base: "2xs", md: "xs" }}
                              color="gray.400"
                            >
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
                      size={{ base: "sm", md: "md" }}
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
            {/* アクションボタン（PC/タブレット） */}
            <VStack
              spacing={{ base: 3, md: 4 }}
              mt={{ base: 6, md: 8 }}
              display={{ base: "none", md: "flex" }}
            >
              <Button
                onClick={handleTryOn}
                isLoading={loading}
                loadingText="AI処理中..."
                colorScheme="teal"
                size={{ base: "md", md: "lg" }}
                width="full"
                maxW={{ base: "full", md: "md" }}
                leftIcon={<FiZap size={16} />}
                isDisabled={!modelImage || !garmentImage}
                _disabled={{
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
                fontSize={{ base: "sm", md: "md" }}
                py={{ base: 6, md: 8 }}
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

            {/* モバイル用 固定アクションバー */}
            <Box
              display={{ base: "block", md: "none" }}
              position="sticky"
              bottom={0}
              left={0}
              right={0}
              bg="white"
              borderTopWidth="1px"
              borderColor="gray.200"
              px={4}
              py={3}
              zIndex={10}
            >
              <Button
                onClick={handleTryOn}
                isLoading={loading}
                loadingText="AI処理中..."
                colorScheme="teal"
                size="lg"
                width="full"
                leftIcon={<FiZap size={16} />}
                isDisabled={!modelImage || !garmentImage}
                _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
              >
                バーチャル試着を開始
              </Button>
            </Box>

            {/* 結果表示 */}
            {resultImageSrc && (
              <Box ref={resultRef} mt={12} width="full" maxW="2xl">
                <VStack spacing={6}>
                  <Heading
                    as="h2"
                    size="xl"
                    textAlign="center"
                    color="teal.600"
                  >
                    🎉 試着結果
                  </Heading>
                  <AspectRatio ratio={3 / 4} width="full">
                    <Image
                      src={resultImageSrc}
                      alt="試着結果"
                      objectFit="contain"
                      borderRadius="md"
                    />
                  </AspectRatio>

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
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 4 }}
                  gap={{ base: 3, md: 4 }}
                >
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
