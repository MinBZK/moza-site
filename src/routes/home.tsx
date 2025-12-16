import { Hero } from "../components/ui/Hero.tsx";
import { Container } from "../components/layout/Container.tsx";
import { Card } from "../components/ui/Card.tsx";
import { HOME_CARDS } from "../constants/cards.ts";

export default function Home() {
  return (
    <>
      <Hero
        title="MijnOverheid Zakelijk"
        subtitle="Ondernemers ontvangen nu versnipperde informatie van veel overheidsorganisaties. Straks regelen en bekijken zij alles op één plek."
      />
      
      <Container>
        <div className="pt-14">
          <div className="xs:grid-cols-1 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_CARDS.map((card) => (
              <Card key={card.href} {...card} />
            ))}
          </div>
        </div>
      </Container>

      <div className="">
        <Container>
          <div className="px-4">
            <div className="xs:w-full flex flex-col py-4 pb-8 text-xl lg:w-2/3">
              <p className="">
                MijnOverheid Zakelijk is in ontwikkeling. Via deze website laten we zien wat we ontwikkelen en hoe we dat doen. We werken samen met diverse overheidsorganisaties en vragen regelmatig om feedback aan onze eindgebruikers. Heb je vragen of mis je informatie? Neem dan contact op met: <a href="mailto:vragen@mijnoverheidzakelijk.nl">vragen@mijnoverheidzakelijk.nl</a>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
