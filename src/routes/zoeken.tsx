import { Container } from "../components/layout/Container.tsx";
import { Search } from "../components/Search.tsx";

function Zoeken() {
  return (
    <Container>
      <div className="mx-auto flex px-2 py-8 sm:px-4 sm:py-6">
        <div className="flex w-full flex-col gap-2 lg:w-2/3">
          <h1 className="mt-0 mb-4 text-2xl font-semibold text-slate-700">
            Zoeken
          </h1>
          <Search />
        </div>
      </div>
    </Container>
  );
}

export default Zoeken;
