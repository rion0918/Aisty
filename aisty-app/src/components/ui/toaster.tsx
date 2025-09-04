"use client"

import { useToast } from "@chakra-ui/react"

export const useToaster = () => {
  const toast = useToast()
  
  return {
    toast: (options: {
      title?: string
      description?: string
      status?: "success" | "error" | "warning" | "info"
      duration?: number
      isClosable?: boolean
    }) => {
      toast({
        title: options.title,
        description: options.description,
        status: options.status || "info",
        duration: options.duration || 5000,
        isClosable: options.isClosable !== false,
        position: "bottom-right",
      })
    }
  }
}

export const Toaster = () => {
  return null // Chakra UI v2 handles toasts automatically
}
