import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const weeklyDir = path.join(__dirname, "../public/content/weekly");
const outputFile = path.join(weeklyDir, "manifest.json");

const getManifest = () => {
  const files = fs.readdirSync(weeklyDir).filter((file) => {
    return file.endsWith(".md");
  });

  const weeklys = files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const filePath = path.join(weeklyDir, filename);
      const content = fs.readFileSync(filePath, "utf-8");

      // Basic frontmatter extraction
      const match = content.match(/^---\n([\s\S]+?)\n---/);
      let title = slug;
      let summary = "";
      let date = "";

      if (match) {
        const frontmatter = match[1];
        const titleMatch = frontmatter.match(/title:\s*(.*)/);
        const summaryMatch = frontmatter.match(/summary:\s*(.*)/);
        const dateMatch = frontmatter.match(/date:\s*(.*)/);

        if (titleMatch)
          title = titleMatch[1].replace(/^['"](.*)['"]$/, "$1").trim();
        if (summaryMatch)
          summary = summaryMatch[1].replace(/^['"](.*)['"]$/, "$1").trim();
        if (dateMatch)
          date = dateMatch[1].replace(/^['"](.*)['"]$/, "$1").trim();
      }

      return {
        slug,
        title,
        summary,
        date,
        file: filename,
      };
    })
    .filter(Boolean);

  // Sort by date (descending) assuming date format is DD-MM-YYYY
  return weeklys.sort((a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  });
};

const manifest = getManifest();
fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

console.log(`Generated manifest.json with ${manifest.length} weekly entries.`);
