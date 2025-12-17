import { type JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  type AgendaEntryType,
  type BlogEntryType,
  loadAllAgendaEntries,
  loadAllPresentaties,
  loadAllWeeklyEntries,
} from "../../../lib/markdown.ts";
import { Container } from "../../../components/layout/Container.tsx";
import { BlogEntry } from "../../../components/actueel/BlogEntry.tsx";
import AgendaItem from "../../../components/actueel/AgendaEntry.tsx";

type ActueelType = "weekly" | "presentaties" | "agenda";
type Entry = BlogEntryType | AgendaEntryType;

const TYPE_CONFIG: Record<
  ActueelType,
  {
    title: string;
    emptyText: string;
    loader: () => Promise<Entry[]>;
    render: (entry: Entry) => JSX.Element;
  }
> = {
  weekly: {
    title: "Weekly",
    emptyText: "Er zijn geen weekly berichten beschikbaar.",
    loader: loadAllWeeklyEntries,
    render: (entry) => (
      <BlogEntry
        key={(entry as BlogEntryType).filename}
        entry={entry as BlogEntryType}
        type="weekly"
      />
    ),
  },
  presentaties: {
    title: "Presentaties",
    emptyText: "Er zijn nog geen presentaties beschikbaar.",
    loader: loadAllPresentaties,
    render: (entry) => (
      <BlogEntry
        key={(entry as BlogEntryType).filename}
        entry={entry as BlogEntryType}
        type="presentaties"
      />
    ),
  },
  agenda: {
    title: "Agenda",
    emptyText: "Er zijn geen agenda items beschikbaar.",
    loader: loadAllAgendaEntries,
    render: (entry) => (
      <AgendaItem
        key={(entry as AgendaEntryType).filename}
        {...(entry as AgendaEntryType)}
      />
    ),
  },
};

const TypeIndex = () => {
  const { type } = useParams();
  const [data, setData] = useState<Entry[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const typedType = (type ?? "") as ActueelType;
  const config = TYPE_CONFIG[typedType];

  useEffect(() => {
    let cancelled = false;

    const fetchContent = async () => {
      if (!config) return;
      setIsLoading(true);
      setError("");

      try {
        const entries = await config.loader();
        if (!cancelled) setData(entries);
      } catch {
        if (!cancelled) setError("Bestand niet gevonden");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchContent();

    return () => {
      cancelled = true;
    };
  }, [config]);

  if (isLoading) return <div>Loading...</div>;
  if (!config) return <div>Error: Ongeldig type</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="px-4 pt-4">
        <h1 className="py-2 text-2xl font-bold text-slate-700">
          {config.title}
        </h1>

        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.length === 0 ? (
            <p className="mb-10 px-4 py-2">{config.emptyText}</p>
          ) : (
            data.map(config.render)
          )}
        </div>
      </div>
    </Container>
  );
};

export default TypeIndex;
