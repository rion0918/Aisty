import { Box } from "@/components/ui/atoms/Box";
import { Text } from "@/components/ui/atoms/Text";

export const Footer = () => {
  return (
    <Box as="footer" py={6} borderTop="1px" borderColor="gray.200">
      <Text textAlign="center" fontSize="sm" color="gray.500">
        © {new Date().getFullYear()} Aisty. All Rights Reserved.
      </Text>
    </Box>
  );
};
