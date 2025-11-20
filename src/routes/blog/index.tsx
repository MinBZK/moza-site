import { Container } from "../../components/layout/Container.tsx";
import { BlogEntry } from "../../components/blog/BlogEntry.tsx";
import { useEffect, useState } from "react";

import { loadAllMarkdownEntries } from "../../lib/markdown.ts";

type WeeklyEntry = {
  filename: string;
  title: string;
  summary: string;
  date: Date;
};

const Blog = () => {
  const [entries, setEntries] = useState<WeeklyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function loadEntries() {
      try {
        const loadedEntries = await loadAllMarkdownEntries();
        if (!cancelled) {
          setEntries(loadedEntries);
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
    <Container>
      <div className="py-4">
        <h1 className="py-2 text-4xl">Blog header</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          {entries.map((entry) => (
            <BlogEntry
              title={entry.title}
              fileName={entry.filename}
              date={entry.date}
            >
              <p>{entry.summary}</p>
            </BlogEntry>
          ))}
        </div>
      </div>

      {/*px-4*/}
    </Container>
  );
};

export default Blog;
