import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  weekly: {
    dir: path.join(__dirname, "../public/content/weekly"),
    urlPrefix: "/actueel/weekly/",
    category: "Weekly",
    recursive: false,
  },
  presentations: {
    dir: path.join(__dirname, "../public/content/presentaties"),
    urlPrefix: "/actueel/presentaties/",
    category: "Presentaties",
    recursive: true,
  },
  onderwerpen: {
    dir: path.join(__dirname, "../src/routes/onderwerpen"),
    urlPrefix: "/onderwerpen/",
    category: "Onderwerpen",
  },
  outputDir: process.argv[2] || path.join(__dirname, "../dist/posts"),
};

const TSX_SPECIAL_CASES = {
  "profielservice.tsx": "/onderwerpen/profiel-service",
  "openwerken.tsx": "/onderwerpen/open-werken",
  "over.tsx": "/over-MOZa",
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

/**
 * Extracts title and body from a TSX file.
 */
function parseTsxFile(fullPath, entryName, fallbackSlug) {
  const content = fs.readFileSync(fullPath, "utf-8");
  const bodyMatch = content.match(/return\s*\(\s*([\s\S]+?)\s*\);/);

  if (!bodyMatch) return null;

  const body = bodyMatch[1]
    .replace(/<[^>]+>/g, " ") // Remove tags
    .replace(/\{[^}]+\}/g, " ") // Remove JS expressions
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  const titleMatch = content.match(/<(h1|h2)[^>]*>([\s\S]+?)<\/\1>/);
  let title = fallbackSlug;
  if (titleMatch) {
    title = titleMatch[2].replace(/<[^>]+>/g, "").trim();
  }

  return { title, body };
}

/**
 * Processes presentation-specific slide splitting.
 */
function processPresentationSlides(
  body,
  title,
  finalSlug,
  urlPrefix,
  category,
) {
  let hIndex = 0;
  const sectionRegex = /<section[^>]*>|<\/section>/g;
  let match;
  let depth = 0;
  let currentTopLevelStart = -1;

  while ((match = sectionRegex.exec(body)) !== null) {
    if (match[0].startsWith("<section")) {
      if (depth === 0) currentTopLevelStart = match.index;
      depth++;
    } else if (match[0] === "</section>") {
      depth--;
      if (depth === 0 && currentTopLevelStart !== -1) {
        const sectionHtml = body.substring(
          currentTopLevelStart,
          match.index + 10,
        );
        const innerContent = body.substring(
          currentTopLevelStart + sectionHtml.indexOf(">") + 1,
          match.index,
        );

        const nestedMatches = innerContent.match(
          /<section[^>]*>[\s\S]*?<\/section>/g,
        );

        if (nestedMatches && nestedMatches.length > 0) {
          let vIndex = 0;
          let vDepth = 0;
          let vStart = -1;
          let vMatch;
          const vRegex = /<section[^>]*>|<\/section>/g;

          while ((vMatch = vRegex.exec(innerContent)) !== null) {
            if (vMatch[0].startsWith("<section")) {
              if (vDepth === 0) vStart = vMatch.index;
              vDepth++;
            } else if (vMatch[0] === "</section>") {
              vDepth--;
              if (vDepth === 0 && vStart !== -1) {
                const vHtml = innerContent.substring(vStart, vMatch.index + 10);
                writeHtmlFile(
                  `${finalSlug}-h${hIndex}-v${vIndex}`,
                  `${title} - Slide ${hIndex}.${vIndex}`,
                  vHtml,
                  `${urlPrefix}${finalSlug}#/${hIndex}/${vIndex}`,
                  category,
                );
                vIndex++;
              }
            }
          }
        } else {
          writeHtmlFile(
            `${finalSlug}-h${hIndex}`,
            `${title} - Slide ${hIndex}`,
            sectionHtml,
            `${urlPrefix}${finalSlug}#/${hIndex}`,
            category,
          );
        }
        hIndex++;
      }
    }
  }

  return hIndex > 0;
}

/**
 * Processes a directory for Markdown files.
 */
function processDirectory(dir, urlPrefix, recursive = false, category = "") {
  if (!fs.existsSync(dir)) return;

  const isPresentations = dir.includes("presentaties");
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive) processDirectory(fullPath, urlPrefix, recursive, category);
      return;
    }

    if (!entry.name.endsWith(".md")) return;

    const content = fs.readFileSync(fullPath, "utf-8");
    const slug = entry.name.replace(".md", "");
    const finalSlug = isPresentations ? path.basename(dir) : slug;

    // Frontmatter extraction
    const fmMatch = content.match(/^---\n([\s\S]+?)\n---/);
    let title = finalSlug;
    let body = content;

    if (fmMatch) {
      const frontmatter = fmMatch[1];
      const titleMatch = frontmatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        title = titleMatch[1]
          .replace(/"/g, "&quot;")
          .replace(/^['"](.*)['"]$/, "$1")
          .trim();
      }
      body = content.replace(fmMatch[0], "");
    }

    if (isPresentations) {
      const handled = processPresentationSlides(
        body,
        title,
        finalSlug,
        urlPrefix,
        category,
      );
      if (handled) return;
    }

    writeHtmlFile(finalSlug, title, body, `${urlPrefix}${finalSlug}`, category);
  });
}

/**
 * Processes a directory for TSX routes.
 */
function processTsxRoutes(dir, urlPrefix, category) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processTsxRoutes(fullPath, `${urlPrefix}${entry.name}/`, category);
      return;
    }

    if (!entry.name.endsWith(".tsx")) return;

    const slug = entry.name.replace(".tsx", "");
    const isIndex = slug === "index";
    const finalSlug = isIndex ? path.basename(dir) : slug;

    const finalUrl =
      TSX_SPECIAL_CASES[entry.name] ||
      (isIndex ? urlPrefix : `${urlPrefix}${slug}`);

    const result = parseTsxFile(fullPath, entry.name, finalSlug);
    if (result) {
      writeHtmlFile(
        `route-${category}-${finalSlug}`,
        result.title,
        result.body,
        finalUrl,
        category,
      );
    }
  });
}

/**
 * Writes an HTML file for indexing.
 */
function writeHtmlFile(filename, title, body, url, category) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
</head>
<body>
    <div data-pagefind-body>
        <h1 data-pagefind-meta="title">${title}</h1>
        <p data-pagefind-meta="pagina" >${category}</p>
        <div class="content">
            ${body}
        </div>
        <a href="${url}" data-pagefind-meta="url[href]"></a>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(CONFIG.outputDir, `${filename}.html`), html);
}

// Execution
processDirectory(
  CONFIG.weekly.dir,
  CONFIG.weekly.urlPrefix,
  CONFIG.weekly.recursive,
  CONFIG.weekly.category,
);
processDirectory(
  CONFIG.presentations.dir,
  CONFIG.presentations.urlPrefix,
  CONFIG.presentations.recursive,
  CONFIG.presentations.category,
);
processTsxRoutes(
  CONFIG.onderwerpen.dir,
  CONFIG.onderwerpen.urlPrefix,
  CONFIG.onderwerpen.category,
);

// Process over.tsx specifically (using the same logic)
const overMozaPath = path.join(__dirname, "../src/routes/over.tsx");
if (fs.existsSync(overMozaPath)) {
  const result = parseTsxFile(overMozaPath, "over.tsx", "Over MOZa");
  if (result) {
    writeHtmlFile(
      "route-over-moza",
      result.title,
      result.body,
      TSX_SPECIAL_CASES["over.tsx"],
      "Over MOZa",
    );
  }
}

console.log(`Generated static HTML files for indexing in ${CONFIG.outputDir}.`);
