import "@rijkshuisstijl-community/design-tokens/dist/index.css";
import "@rijkshuisstijl-community/components-css/dist/index.css";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "@rijkshuisstijl-community/components-react";
import Blog from "./routes/blog";
import Detail from "./routes/blog/[slug].tsx";
import OnderwerpenLijst from "./routes/onderwerpen";
import Profielservice from "./routes/onderwerpen/profielservice.tsx";
import Portaal from "./routes/onderwerpen/portaal.tsx";
import Home from "./routes/home.tsx";
import { Header } from "./components/layout/Header.tsx";
import { Navbar } from "./components/layout/Navbar.tsx";
import Contact from "./routes/contact.tsx";
import NotFound from "./routes/errors/404.tsx";

function App() {
  return (
    <Router>
      <div className="rhc-theme moza-theme-overrides flex min-h-screen flex-col">
        <Header />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/onderwerpen" element={<OnderwerpenLijst />} />
            <Route
              path="/onderwerpen/profielservice"
              element={<Profielservice />}
            />
            <Route path="/onderwerpen/portaal" element={<Portaal />} />
            <Route path="/blog/:name" element={<Detail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer
          heading={"MijnOverheid Zakelijk"}
          backtotop={true}
          preFooter={false}
        />
      </div>
    </Router>
  );
}

export default App;
