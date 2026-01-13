import { Link, useParams } from "react-router-dom";
import { Container } from "../../../components/layout/Container.tsx";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { EntryGrid } from "../../../components/ui/EntrySection.tsx";

interface WeeklyEntry {
  slug: string;
  title: string;
  summary: string;
  date: string;
  file: string;
}

const Weekly = () => {
  const [weeklys, setWeeklys] = useState<WeeklyEntry[]>([]);

  useEffect(() => {
    fetch("/content/weekly/manifest.json")
      .then((res) => res.json())
      .then((data) => setWeeklys(data));
  }, []);

  return (
    <Container>
      <div className="px-4 pt-4">
        <h1 className="py-2 text-2xl font-bold text-slate-700">Weekly's</h1>
        <EntryGrid
          entries={weeklys}
          basePath="/actueel/weekly"
          emptyMessage="Er zijn geen weekly berichten beschikbaar."
        />
      </div>
    </Container>
  );
};

export const WeeklyDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [prevEntry, setPrevEntry] = useState<WeeklyEntry | null>(null);
  const [nextEntry, setNextEntry] = useState<WeeklyEntry | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const manifestRes = await fetch("/content/weekly/manifest.json");
        const manifest: WeeklyEntry[] = await manifestRes.json();
        const entryIndex = manifest.findIndex((p) => p.slug === slug);
        const entry = manifest[entryIndex];

        if (entry) {
          setTitle(entry.title);
          setDate(entry.date);

          setPrevEntry(entryIndex > 0 ? manifest[entryIndex - 1] : null);
          setNextEntry(
            entryIndex < manifest.length - 1 ? manifest[entryIndex + 1] : null,
          );

          const res = await fetch(`/content/weekly/${entry.file}`);
          let text = await res.text();

          // Strip frontmatter
          text = text.replace(/^---[\s\S]*?---/, "");

          setContent(text);
        }
      } catch (error) {
        console.error("Error loading weekly entry:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center py-20">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  if (!content) {
    return (
      <Container>
        <p>Post not found</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto flex w-full justify-center px-2 py-6 sm:px-4 sm:py-10">
        <div className="w-full max-w-[1200px]">
          <div className="">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 py-2">
                <span className="text-base">📅</span>
                <span className="text-sm font-medium">{date}</span>
              </div>
            </div>
          </div>
          <div className="prose max-w-none py-2 lg:w-2/3">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div className="mt-8 flex justify-between border-t border-slate-200 pt-8 lg:w-2/3">
            {nextEntry ? (
              <Link
                to={`/actueel/weekly/${nextEntry.slug}`}
                className="flex flex-col gap-1 text-sky-700 hover:underline"
              >
                <span className="text-xs text-slate-500">Vorige</span>
                <span className="max-w-[150px] truncate text-sm font-semibold sm:max-w-[250px]">
                  {nextEntry.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {prevEntry ? (
              <Link
                to={`/actueel/weekly/${prevEntry.slug}`}
                className="flex flex-col items-end gap-1 text-sky-700 hover:underline"
              >
                <span className="text-right text-xs text-slate-500">
                  Volgende
                </span>
                <span className="max-w-[150px] truncate text-sm font-semibold sm:max-w-[250px]">
                  {prevEntry.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Weekly;
