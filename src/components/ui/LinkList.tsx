interface LinkItem {
  label: string;
  url: string;
}

interface LinkSection {
  label: string;
  links: LinkItem[];
}

interface LinkListProps {
  sections: LinkSection[];
}

export const LinkList = ({ sections }: LinkListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((section, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          <h2 className="border-b border-slate-200 pb-2 text-lg font-bold text-slate-800">
            {section.label}
          </h2>
          <ul className="flex flex-col gap-2">
            {section.links.map((link, linkIdx) => (
              <li key={linkIdx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
