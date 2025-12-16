import { Container } from "../components/layout/Container.tsx";

const Contact = () => {
  return (
    <Container>
      <div className="mx-auto flex px-2 py-8 sm:px-4 sm:py-6">
        <div className="flex w-full flex-col gap-2 lg:w-2/3">
          <h1 className="m-0 text-2xl font-semibold text-slate-700">
            Contact
          </h1>
          <div>

            <p className="mb-4 text-slate-800">
              Je kunt het programmateam bereiken via <a href="mailto:contact@mijnoverheid-zakelijk.nl" className="text-sky-700  hover:text-sky-900 hover:underline">contact@mijnoverheid-zakelijk.nl</a>.
            </p>

            <h2 className="mt-6 mb-1 text-xl font-semibold text-slate-700">Mattermost chat</h2>

            <p>
              Of <a className="text-sky-700 hover:text-sky-900 hover:underline" href="https://digilab.overheid.nl/chat/mijnoverheid-zakelijk">sluit je aan bij ons chatkanaal</a>.
            </p>
            <p>
              Wij gebruiken voor dagelijkse communicatie Mattermost. Je kunt hier vragen stellen, discussiëren en in contact komen met het programmateam van MijnOverheid Zakelijk.
            </p>
            <h3 className="mt-6 mb-1 text-lg font-semibold text-slate-700">Mattermost instellen</h3>
            <p>
              Zorg ervoor dat je <a href="https://mattermost.com/apps/" className="text-sky-700 hover:text-sky-900 hover:underline">Mattermost hebt geïnstalleerd</a> en volg deze stappen:
            </p>
            <ol className="list-decimal space-y-2 pl-6 mb-4 text-slate-800">
              <li><a href="https://realisatieibds.pleio.nl/register" className="text-sky-700 hover:text-sky-900 hover:underline">Registreer een nieuwe account op Pleio</a> met je <code className="bg-[#f3f3f3] p-1 text-xs">@rijksoverheid.nl</code> e-mailadres</li>
              <li>
                <a href="https://digilab.overheid.nl/chat/login" className="text-sky-700 hover:text-sky-900 hover:underline">Login</a> → Gitlab → Pleio
                <ul className="list-disc space-y-2 pl-6 mt-2 mb-4">
                  <li>
                    of configureer de volgende server in Mattermost: <code className="bg-[#f3f3f3] p-1 text-xs"><a href="https://digilab.overheid.nl/chat">https://digilab.overheid.nl/chat</a></code>
                  </li>
                </ul>
              </li>
              <li><a href="mailto:contact@mijnoverheid-zakelijk.nl" className="text-sky-700  hover:text-sky-900 hover:underline">Vraag ons om je toe te voegen</a> aan het MijnOverheid Zakelijk team</li>
              <li>
               💡 Vergeet niet je profiel in te stellen, inclusief een herkenbare profiel afbeelding</li>
            </ol>
            <p>
              Kom je er niet uit? <a href="mailto:contact@mijnoverheid-zakelijk.nl" className="text-sky-700 hover:text-sky-900 hover:underline">Stuur ons een e-mail</a>!
            </p>

            <h2 className="mt-8 mb-1 text-xl font-semibold text-slate-700">Over MijnOverheid Zakelijk</h2>
            <p className="mb-4 text-slate-800">
              MijnOverheid Zakelijk is een programma van Logius (in opdracht van
              het ministerie van Binnenlandse Zaken en Koninkrijksrelaties) en
              werkt samen met:
            </p>
            
            <ul className="list-disc space-y-2 pl-6 mb-4 text-slate-800">
              <li>de Belastingdienst</li>
              <li>douane</li>
              <li>KVK</li>
              <li>RDW</li>
              <li>Rijks ICT Gilde</li>
              <li>gemeente Rotterdam</li>
              <li>ministerie van Economische Zaken</li>
              <li>RVO</li>
              <li>UWV</li>
              <li>VNG</li>
            </ul>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
