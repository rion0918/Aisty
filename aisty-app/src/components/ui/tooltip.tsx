import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from "@chakra-ui/react"
import * as React from "react"

export interface TooltipProps extends ChakraTooltipProps {
  children: React.ReactNode
  label: string
}

export const Tooltip = (props: TooltipProps) => {
  const { children, label, ...rest } = props

  return (
    <ChakraTooltip label={label} {...rest}>
      {children}
    </ChakraTooltip>
  )
}
