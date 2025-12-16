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
                MijnOverheid Zakelijk is in ontwikkeling. We doen dit samen met diverse overheidsorganisaties en eindgebruikers.
              </p>
              <p className="">
                Heb je vragen of mis je informatie? Neem contact op met: <a href="mailto:vragen@mijnoverheidzakelijk.nl" className="text-sky-800 hover:text-sky-900 hover:underline">vragen@mijnoverheidzakelijk.nl</a>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
