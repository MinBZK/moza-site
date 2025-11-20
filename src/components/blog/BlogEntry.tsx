import type { ReactNode } from "react";
import { Button } from "@rijkshuisstijl-community/components-react";
import { Link } from "react-router-dom";

export interface BlogEntryProps {
  title: string;
  fileName: string;
  date: Date;
  children: ReactNode;
}

export const BlogEntry = ({
  title,
  fileName,
  date,
  children,
}: BlogEntryProps) => (
  <div className="relative border border-gray-200 p-4 lg:m-0">
    <p className="float-end mb-8 text-gray-600">
      {date.toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
    <h2 className="mb-4 text-xl font-bold">{title}</h2>
    {children}
    <Link
      to={`/blog/${fileName}`}
      className="float-right mt-4 inline-block text-blue-600 underline hover:text-blue-800"
    >
      <Button appearance={"primary-action-button"}>Lees</Button>
    </Link>
  </div>
);
