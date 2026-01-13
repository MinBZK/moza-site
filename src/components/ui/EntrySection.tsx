import { Link } from "react-router-dom";
import { IconText } from "./iconText.tsx";
import ChevronIcon from "./ChevronIcon.tsx";
import { EntryCard } from "./EntryCard.tsx";

interface Entry {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

interface EntryGridProps {
  entries: Entry[];
  basePath: string;
  emptyMessage: string;
  limit?: number;
}

export const EntryGrid = ({
  entries,
  basePath,
  emptyMessage,
  limit,
}: EntryGridProps) => {
  const displayedEntries = limit ? entries.slice(0, limit) : entries;

  if (entries.length === 0) {
    return <p className="mb-10 px-4 py-2">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
      {displayedEntries.map((entry, index) => (
        <EntryCard
          key={index}
          title={entry.title}
          date={entry.date}
          summary={entry.summary}
          slug={entry.slug}
          basePath={basePath}
        />
      ))}
    </div>
  );
};

interface EntrySectionProps {
  title: string;
  entries: Entry[];
  basePath: string;
  emptyMessage: string;
  viewAllLink?: string;
  viewAllText?: string;
  limit?: number;
}

export const EntrySection = ({
  title,
  entries,
  basePath,
  emptyMessage,
  viewAllLink,
  viewAllText,
  limit,
}: EntrySectionProps) => {
  return (
    <section className="mb-4">
      <div className="px-4 pt-4">
        <h1 className="py-2 text-2xl font-bold text-slate-700">{title}</h1>

        <EntryGrid
          entries={entries}
          basePath={basePath}
          emptyMessage={emptyMessage}
          limit={limit}
        />

        {viewAllLink && viewAllText && (
          <div>
            <IconText
              IconBefore={(props) => (
                <ChevronIcon
                  {...props}
                  bold={true}
                  className="h-3 w-4 font-bold text-[#056ba9]"
                />
              )}
            >
              <Link to={viewAllLink} className="font-bold text-[#056ba9]">
                {viewAllText}
              </Link>
            </IconText>
          </div>
        )}
      </div>
    </section>
  );
};
