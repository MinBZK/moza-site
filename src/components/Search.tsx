import { useEffect, useRef } from "react";

interface SearchProps {
  category?: string;
  placeholder?: string;
}

declare global {
  interface Window {
    PagefindUI: any;
  }
}

export function Search({ category, placeholder }: SearchProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pagefindUI: any;

    const initPagefind = () => {
      if (window.PagefindUI && searchRef.current) {
        try {
          const options: any = {
            element: searchRef.current,
            showImages: false,
            bundlePath: "/pagefind/",
          };

          if (placeholder) {
            options.translations = { placeholder: placeholder };
          }

          pagefindUI = new window.PagefindUI(options);
        } catch (e) {
          console.error("Pagefind UI failed to initialize", e);
        }
      }
    };

    if (!window.PagefindUI) {
      const script = document.createElement("script");
      script.src = "/pagefind/pagefind-ui.js";
      script.async = true;
      script.onload = initPagefind;
      document.head.appendChild(script);

      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(style);
    } else {
      initPagefind();
    }

    return () => {
      if (searchRef.current) {
        searchRef.current.innerHTML = "";
        console.log("Removing Pagefind UI", pagefindUI);
      }
    };
  }, [category, placeholder]);

  return <div ref={searchRef} className="pagefind-search-container"></div>;
}
