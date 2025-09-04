import { SignUp } from "@clerk/nextjs";
import { Flex, Box } from "@chakra-ui/react";
import { Header } from "@/components/ui/molecules/Header";

export default function Page() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Flex 
        justify="center" 
        align="center" 
        minH="100vh"
        pt={{ base: "80px", md: "100px" }}
        px={{ base: 4, md: 8 }}
      >
        <SignUp 
          appearance={{
            layout: {
              logoImageUrl: "/images/image.png",
            },
            variables: {
              colorPrimary: "#319795",
            },
            elements: {
              rootBox: {
                width: "100%",
                maxWidth: "400px",
              },
              card: {
                width: "100%",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              },
              headerTitle: {
                color: "#1a202c",
                fontSize: "24px",
                fontWeight: "600",
              },
              headerSubtitle: {
                color: "#4a5568",
              },
              formButtonPrimary: {
                backgroundColor: "#319795",
                "&:hover": {
                  backgroundColor: "#2c7a7b",
                },
              },
              formFieldLabel: {
                color: "#2d3748",
              },
              formFieldInput: {
                backgroundColor: "white",
                borderColor: "#e2e8f0",
                color: "#2d3748",
                "&:focus": {
                  borderColor: "#319795",
                  boxShadow: "0 0 0 1px #319795",
                },
              },
              footerActionText: {
                color: "#4a5568",
              },
              footerActionLink: {
                color: "#319795",
                "&:hover": {
                  color: "#2c7a7b",
                },
              },
            },
          }}
          afterSignUpUrl="/tryon"
          routing="path"
          path="/sign-up"
        />
      </Flex>
    </Box>
  );
}