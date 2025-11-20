import { Hero } from "../components/ui/Hero.tsx";
import { Container } from "../components/layout/Container.tsx";
import { Card } from "../components/ui/Card.tsx";
import { HOME_CARDS } from "../constants/cards.ts";

export default function Home() {
  return (
    <>
      <Hero
        title="MijnOverheid Zakelijk"
        subtitle="Welkom bij het centrale punt voor alle overheidssystemen en digitale dienstverlening"
      />

      <Container>
        <div className="xs:grid-cols-1 mb-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CARDS.map((card) => (
            <Card key={card.href} {...card} />
          ))}
        </div>
      </Container>
    </>
  );
}
