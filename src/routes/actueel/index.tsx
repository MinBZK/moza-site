import { Container } from "../../components/layout/Container.tsx";
import { BlogEntry } from "../../components/actueel/BlogEntry.tsx";
import { type ReactNode, useEffect, useState } from "react";

import {
  type AgendaEntryType,
  type BlogEntryType,
  loadAllEntries,
} from "../../lib/markdown.ts";
import AgendaItem from "../../components/actueel/AgendaEntry.tsx";
import ChevronIcon from "../../components/ui/ChevronIcon.tsx";
import { IconText } from "../../components/ui/iconText.tsx";
import { Link } from "react-router-dom";

const Actueel = () => {
  const [weeklyEntries, setWeeklyEntries] = useState<{
    weekly: BlogEntryType[];
    nieuws: BlogEntryType[];
    agenda: AgendaEntryType[];
    presentaties: BlogEntryType[];
  }>({ weekly: [], nieuws: [], agenda: [], presentaties: [] });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function loadEntries() {
      try {
        const data = await loadAllEntries();
        if (!cancelled) {
          setWeeklyEntries(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load weekly markdown content",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Container>
        <div className="pt-4">
          <Container>
            <ActueelNav />
          </Container>

          <ActueelSection
            title="Weekly"
            items={weeklyEntries.weekly}
            emptyText="Er zijn geen weekly berichten beschikbaar."
            allLink={{ to: "/actueel/weekly", label: "Alle weekly's" }}
            renderItem={(entry) => (
              <BlogEntry key={entry.filename} entry={entry} type="weekly" />
            )}
          />

          <ActueelSection
            title="Agenda"
            items={weeklyEntries.agenda}
            emptyText="Er zijn geen agenda items beschikbaar."
            allLink={{ to: "/actueel/agenda", label: "Alle agenda items" }}
            renderItem={(entry) => (
              <AgendaItem key={entry.filename} {...entry} />
            )}
          />

          <ActueelSection
            title="Presentaties"
            items={weeklyEntries.presentaties}
            emptyText="Er zijn nog geen presentaties beschikbaar."
            allLink={{
              to: "/actueel/presentaties",
              label: "Alle presentaties",
            }}
            className="mb-10 px-4 pt-2"
            renderItem={(entry) => (
              <BlogEntry
                key={entry.filename}
                entry={entry}
                type="presentaties"
              />
            )}
          />
        </div>
      </Container>
    </>
  );
};

const NAV_ITEMS = ["Weekly", "Agenda", "Presentaties"] as const;

export function ActueelNav() {
  return (
    <div className="bg-[#f3f3f3] pl-2">
      <div className="mb-6 px-4 pl-2">
        <ul className="flex py-3 text-base">
          {NAV_ITEMS.map((item) => (
            <li key={item} className="mr-2 ml-0 text-sky-700">
              <IconText
                IconBefore={(props) => (
                  <ChevronIcon {...props} className="h-3 w-4" />
                )}
              >
                <Link
                  to={`/actueel/${item.toLowerCase()}`}
                  className="flex items-center hover:underline"
                >
                  {item}
                </Link>
              </IconText>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Props<T> = {
  title: string;
  items: T[];
  emptyText: string;
  allLink: { to: string; label: string };
  renderItem: (item: T) => ReactNode;
  className?: string;
  limit?: number;
};

export function ActueelSection<T>({
  title,
  items,
  emptyText,
  allLink,
  renderItem,
  className,
  limit = 6,
}: Props<T>) {
  const visibleItems = items.slice(0, limit);

  return (
    <section className={className ?? "px-4 pt-2"}>
      <h1 className="py-2 text-2xl font-bold text-slate-700">{title}</h1>

      <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <p className="mb-10 py-2">{emptyText}</p>
        ) : (
          visibleItems.map(renderItem)
        )}
      </div>

      <div className="float-end">
        <IconText
          IconBefore={(props) => (
            <ChevronIcon
              {...props}
              bold={true}
              className="h-3 w-4 font-bold text-[#056ba9]"
            />
          )}
        >
          <Link to={allLink.to} className="font-bold text-[#056ba9]">
            {allLink.label}
          </Link>
        </IconText>
      </div>
    </section>
  );
}

export default Actueel;
