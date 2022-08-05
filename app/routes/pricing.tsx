import { Container, SimpleGrid, Title } from "@mantine/core";
import type { HeadersFunction } from "@remix-run/node";

import PriceCard from "~/components/pricing/price-card";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=60, s-maxage=604800, stale-while-revalidate=604800",
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
        <PriceCard duration="Monthly" price={200} />
        <PriceCard duration="Half Yearly" price={1000} />
        <PriceCard duration="Yearly" price={2000} />
      </SimpleGrid>
    </Container>
  );
}
