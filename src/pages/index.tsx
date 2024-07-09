import { Box, Grid, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Form } from "../components/form";
import { Particle } from "../components/Particle";

export function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
          <Particle />
        <VStack spacing={8}>
          <Form />
        </VStack>
      </Grid>
    </Box>
  );
}
