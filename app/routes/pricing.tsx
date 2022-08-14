import { Container, SimpleGrid, Title } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";

import PriceCard from "~/components/pricing/price-card";

export const meta: MetaFunction = () => {
  return {
    title: "Pricing - Ronon",
  };
};

export default function PricingPage() {
  return (
    <Container>
      <Title order={2} align="center">
        Pricing
      </Title>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        mt="xl"
      >
        <PriceCard duration="Monthly" price={220} />
        <PriceCard duration="Half Yearly" price={1000} />
        <PriceCard duration="Yearly" price={2000} />
      </SimpleGrid>
    </Container>
  );
}
