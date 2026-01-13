import { Link } from "react-router-dom";

interface EntryCardProps {
  title: string;
  date: string;
  summary: string;
  slug: string;
  basePath: string;
}

export const EntryCard = ({
  title,
  date,
  summary,
  slug,
  basePath,
}: EntryCardProps) => {
  return (
    <div className="">
      <Link
        to={`${basePath}/${slug}`}
        className="group relative flex h-[220px] flex-col space-y-1 self-end lg:m-0"
      >
        <h2 className="text-xl text-sky-700 group-hover:underline">{title}</h2>

        <div className="mt-1 flex items-center gap-1">
          <span className="text-base">📅</span>
          <p className="text-sm font-bold text-gray-600">{date}</p>
        </div>
        <div className="line-clamp-5 overflow-hidden text-ellipsis text-slate-800">
          {summary}
        </div>
      </Link>
    </div>
  );
};
