import { Container } from "../../components/layout/Container.tsx";
import { LinkList } from "../../components/ui/LinkList.tsx";

const Proeftuin = () => {
  const linkjes = [
    {
      label: "Voorbeeld applicaties",
      links: [
        {
          label: "MijnOverheid Zakelijk",
          url: "https://moza.mijnoverheidzakelijk.nl",
        },
        {
          label: "Vakapplicatie",
          url: "https://vakapplicatie.mijnoverheidzakelijk.nl",
        },
      ],
    },
    {
      label: "Overige handige linkjes",
      links: [
        {
          label: "Technische documentatie",
          url: "https://docs.mijnoverheidzakelijk.nl",
        },
        {
          label: "Github",
          url: "https://github.com/MinBZK/MijnOverheidZakelijk",
        },
        {
          label: "Figma",
          url: "https://www.figma.com/proto/Px77Bmqi8hjlbiPVtJrSkw/MOZa-gebruikerstest?page-id=80%3A8583&node-id=80-8586&p=f&viewport=25%2C79%2C0.7&t=4UaOV6eSoMfyYqMY-1&scaling=scale-down-width&content-scaling=fixed",
        },
        {
          label: "Samenwerkingsruimte",
          url: "https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/SitePages/Home.aspx",
        },
      ],
    },
  ];

  return (
    <Container>
      <div className="mx-auto flex px-2 py-8 sm:px-4 sm:py-6">
        <div className="flex w-full flex-col gap-2 lg:w-2/3">
          <h1 className="mt-0 mb-4 text-2xl font-semibold text-slate-700">
            Proeftuin
          </h1>
          <p className="text-slate-800">
            Een overzicht van alle beschikbare tools, applicaties, documentatie
            en relevante links van MijnOverheid Zakelijk.
          </p>
        </div>
      </div>
      <div className="mx-auto px-2 pb-8 sm:px-4 sm:pb-12">
        <LinkList sections={linkjes} />
      </div>
    </Container>
  );
};

export default Proeftuin;
