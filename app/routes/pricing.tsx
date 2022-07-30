import { Container, SimpleGrid, Title } from "@mantine/core";
import PriceCard from "~/components/pricing/price-card";

export default function PricingPage() {
  return (
    <Container>
      <Title order={2} align="center">
        Pricing
      </Title>

      <SimpleGrid cols={3} mt="xl">
        <PriceCard duration="Monthly" price={100} />
        <PriceCard duration="Half Yearly" price={90} />
        <PriceCard duration="Yearly" price={75} />
      </SimpleGrid>
    </Container>
  );
}
