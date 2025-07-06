//トップコンポーネントはSSRでレンダリングを行うようにする。

import { Box } from "@/components/ui/atoms/Box"
import { FeatureSection } from "@/components/ui/organisms/FeatureSection"
import { HeroSection } from "@/components/ui/organisms/HeroSection/HeroSection"
import { UsageExampleSection } from "@/components/ui/organisms/UsageExampleSection/UsageExampleSection"

export default function Home() {
  return (
    <Box as="main" position="relative">
      {/* クライアント、サーバーコンポーネントの考え方サーバーファーストを意識 */}
      <HeroSection />
      <UsageExampleSection />
      <FeatureSection />
    </Box>
  )
}