import { Container } from "../components/layout/Container.tsx";

const Contact = () => {
  return (
    <Container>
      <div className="mx-auto flex w-full justify-center px-2 py-6 sm:px-4 sm:py-10">
        <div className="w-full max-w-[768px]">
          <h1 className="mb-6 text-4xl font-bold text-slate-700">Contact</h1>

          <div>
            <p className="mb-4 text-lg">
              MijnOverheid Zakelijk is een programma van Logius (in opdracht van
              het ministerie van Binnenlandse Zaken en Koninkrijksrelaties) en
              werkt samen met de Belastingdienst, douane, KVK, RDW, RijksICT
              Gilde, gemeente Rotterdam, RVO, ministerie van Economische Zaken,
              UWV en VNG.
            </p>

            <p className="mb-4 text-lg">
              Je kunt het programmateam bereiken via
            </p>

            <div className="mt-8 rounded-md bg-sky-50 p-6 text-center">
              <p className="mb-2 text-sm text-sky-900">Mail ons op:</p>
              <a
                href="mailto:contact@mijnoverheid-zakelijk.nl"
                className="inline-block text-xl font-semibold text-sky-800 hover:text-sky-900 hover:underline"
              >
                contact@mijnoverheid-zakelijk.nl
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
