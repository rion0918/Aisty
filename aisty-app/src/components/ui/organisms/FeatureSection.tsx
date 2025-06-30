import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { Text } from "@/components/ui/atoms/Text";
import { FcIdea, FcTodoList, FcCollaboration } from "react-icons/fc";

type FeatureProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack gap={4} textAlign="center">
      {icon}
      <Heading as="h3" size="md">{title}</Heading>
      <Text color="gray.600">{text}</Text>
    </VStack>
  );
};

export const FeatureSection = () => {
  return (
    <Box as="section" py={20}>
      <VStack gap={4} textAlign="center" mb={10}>
        <Heading as="h2" size="xl">Features</Heading>
        <Text fontSize="lg" color="gray.500">
          Discover what Aisty can do for you.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        <Feature
          icon={<FcTodoList />}
          title={"Manage Your Tasks"}
          text={
            "Organize your work and life, finally. Become focused, organized, and calm with Aisty."
          }
        />
        <Feature
          icon={<FcCollaboration />}
          title={"Collaborate with Your Team"}
          text={
            "Share your projects and delegate tasks. Aisty makes teamwork more productive."
          }
        />
        <Feature
          icon={<FcIdea />}
          title={"Visualize Your Progress"}
          text={
            "See your progress at a glance. Aisty helps you stay motivated and on track."
          }
        />
      </SimpleGrid>
    </Box>
  );
};
