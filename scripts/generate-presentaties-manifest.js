import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const presentationsDir = path.join(__dirname, "../public/content/presentaties");
const outputFile = path.join(presentationsDir, "manifest.json");

const getManifest = () => {
  const folders = fs.readdirSync(presentationsDir).filter((file) => {
    return fs.statSync(path.join(presentationsDir, file)).isDirectory();
  });

  const presentations = folders
    .map((slug) => {
      const folderPath = path.join(presentationsDir, slug);
      const mdFile = fs
        .readdirSync(folderPath)
        .find((file) => file.endsWith(".md"));

      if (!mdFile) return null;

      const content = fs.readFileSync(path.join(folderPath, mdFile), "utf-8");

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
        file: mdFile,
      };
    })
    .filter(Boolean);

  return presentations;
};

const manifest = getManifest();
fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

console.log(`Generated manifest.json with ${manifest.length} presentations.`);
