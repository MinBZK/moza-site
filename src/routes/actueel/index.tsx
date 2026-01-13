import { Container } from "../../components/layout/Container.tsx";
import { useEffect, useState } from "react";
import type { WeeklyEntry } from "../../types/WeeklyEntry.ts";
import type { Presentatie } from "../../types/PresentatieEntry.ts";
import { EntrySection } from "../../components/ui/EntrySection.tsx";

const Actueel = () => {
  const [weeklys, setWeeklys] = useState<WeeklyEntry[]>([]);
  const [presentaties, setPresentaties] = useState<Presentatie[]>([]);

  useEffect(() => {
    fetch("/content/weekly/manifest.json")
      .then((res) => res.json())
      .then((data) => setWeeklys(data));
  }, []);

  useEffect(() => {
    fetch("/content/presentaties/manifest.json")
      .then((res) => res.json())
      .then((data) => setPresentaties(data));
  }, []);

  return (
    <Container>
      <EntrySection
        title="Weekly's"
        entries={weeklys}
        basePath="/actueel/weekly"
        emptyMessage="Er zijn geen weekly berichten beschikbaar."
        viewAllLink="/actueel/weekly"
        viewAllText="Alle weeklys"
        limit={6}
      />
      <EntrySection
        title="Presentaties"
        entries={presentaties}
        basePath="/actueel/presentaties"
        emptyMessage="Er zijn geen weekly presentaties beschikbaar."
        viewAllLink="/actueel/presentaties"
        viewAllText="Alle presentaties"
        limit={6}
      />
    </Container>
  );
};

export default Actueel;
