import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container } from "../../components/layout/Container.tsx";
import { Separator } from "@rijkshuisstijl-community/components-react";
import { loadMarkdownByFilename } from "../../lib/markdown.ts";
import NotFound from "../errors/404.tsx";

type slug = {
  content: string;
  title: string;
  summary: string;
  date: Date;
};

const BlogDetail = () => {
  const { name } = useParams();
  const [data, setData] = useState<slug>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!name) return;
      setIsLoading(true);

      try {
        const blogData = await loadMarkdownByFilename(name);
        setData(blogData);
      } catch {
        setError("Bestand niet gevonden");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [name]);

  if (isLoading) {
    return (
      <div className="my-50 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#154273] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <div className="mx-auto max-w-full">
        <div className="prose relative min-w-full py-4">
          <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
          <div className="mb-8 text-gray-600">
            {data.date.toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <Separator />
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetail;
