import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../components/layout/Container.tsx";
import { useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "../../../styles/rijkshuisstijl_reveal.css";
import { EntryGrid } from "../../../components/ui/EntrySection.tsx";

interface Presentatie {
  slug: string;
  title: string;
  summary: string;
  date: string;
  file: string;
}

const Presentaties = () => {
  const [presentaties, setPresentaties] = useState<Presentatie[]>([]);

  useEffect(() => {
    fetch("/content/presentaties/manifest.json")
      .then((res) => res.json())
      .then((data) => setPresentaties(data));
  }, []);

  return (
    <Container>
      <div className="px-4 pt-4">
        <h1 className="py-2 text-2xl font-bold text-slate-700">Presentaties</h1>
        <EntryGrid
          entries={presentaties}
          basePath="/actueel/presentaties"
          emptyMessage="Er zijn geen weekly presentaties beschikbaar."
        />
      </div>
    </Container>
  );
};

export const PresentatieDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const manifestRes = await fetch("/content/presentaties/manifest.json");
        const manifest: Presentatie[] = await manifestRes.json();
        const presentation = manifest.find((p) => p.slug === slug);

        if (presentation) {
          const res = await fetch(
            `/content/presentaties/${slug}/${presentation.file}`,
          );
          let text = await res.text();

          // Strip frontmatter
          text = text.replace(/^---[\s\S]*?---/, "");

          setMarkdown(text);
        }
      } catch (error) {
        console.error("Error loading presentation:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  useEffect(() => {
    if (deckRef.current && markdown && !revealRef.current) {
      revealRef.current = new Reveal(deckRef.current, {
        embedded: true,
        controls: true,
        progress: true,
        overview: true,
        hash: true,
      });

      revealRef.current.initialize().then(() => {
        // After initialization, check if there's a hash in the URL and sync reveal
        const hash = window.location.hash;
        if (hash) {
          // reveal.js usually handles this if hash: true,
          // but sometimes with React routing it might need a nudge.
          // The hash: true option in Reveal already listens to window hash.
        }
      });
    }

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, [markdown]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!markdown) {
    return <p>Post not found</p>;
  }

  return (
    <div className="h-[100vh] w-full overflow-hidden bg-black">
      <button
        className="absolute top-4 right-4 z-[100] cursor-pointer text-5xl text-[#2b5480]"
        onClick={() => navigate(-1)}
      >
        &#10539;
      </button>
      <style>{`
        nav, footer, header { display: none !important; }
        img#header-logo:has(+ div section.present.hide-logo) { display: none; }   
      `}</style>
      <img
        src="/assets/images/rijksoverheid.svg"
        alt="Logo"
        id="header-logo"
        className="fixed top-0 z-50"
      />
      <div ref={deckRef} className="reveal">
        <div
          className="slides"
          dangerouslySetInnerHTML={{ __html: markdown || "" }}
        />
      </div>
    </div>
  );
};

export default Presentaties;
