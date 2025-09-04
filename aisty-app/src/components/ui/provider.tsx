"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import type { ThemeProviderProps } from "next-themes"

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
