import { default as matter } from "gray-matter";
import { parse } from "date-fns";
import type { BlogDetail, BlogEntry } from "../types/blog.ts";

const markdownModules = import.meta.glob<string>("../assets/blog/*.md", {
  query: "?raw",
  import: "default",
});

export async function loadAllMarkdownEntries(): Promise<BlogEntry[]> {
  const loadedEntries: BlogEntry[] = await Promise.all(
    Object.entries(markdownModules).map(async ([path, loader]) => {
      const content = await loader();
      const { data } = matter(content);
      const filename = path.split("/").pop() ?? path;

      return {
        filename,
        title: data.title,
        summary: data.summary,
        date: parse(data.date, "dd-MM-yyyy", new Date()),
      };
    }),
  );

  // Sort by date, most recent first
  return loadedEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadMarkdownByFilename(
  filename: string,
): Promise<BlogDetail> {
  const matchingFiles = Object.keys(markdownModules).filter((path) =>
    path.endsWith(`/${filename}`),
  );

  if (matchingFiles.length === 0) {
    throw new Error("File not found");
  }

  const rawContent = await markdownModules[matchingFiles[0]]();
  const { data, content } = matter(rawContent);

  return {
    content,
    title: data.title,
    summary: data.summary,
    date: parse(data.date, "dd-MM-yyyy", new Date()),
  };
}
