import { Container } from "../../components/layout/Container.tsx";
import { HOME_CARDS } from "../../constants/cards.ts";
import { Card } from "../../components/ui/Card.tsx";

const OnderwerpenLijst = () => {
  return (
    <Container>
      <div className="mx-auto flex sm:py-6">
        <div className="flex w-full flex-col gap-2">
          <h1 className="mb-4 px-4 text-2xl font-semibold text-slate-700">
            Onderwerpen
          </h1>
          <div className="mb-10">
            <div className="xs:grid-cols-1 mb-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
              {HOME_CARDS.map((card) => (
                <Card key={card.href} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OnderwerpenLijst;
