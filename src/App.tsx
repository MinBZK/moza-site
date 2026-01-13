import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OnderwerpenLijst from "./routes/onderwerpen";
import Profielservice from "./routes/onderwerpen/profielservice.tsx";
import Portaal from "./routes/onderwerpen/portaal.tsx";
import Home from "./routes/home.tsx";
import Privacy from "./routes/privacy.tsx";
import Toegankelijkheid from "./routes/toegankelijkheid.tsx";
import { Header } from "./components/layout/Header.tsx";
import { Navbar } from "./components/layout/Navbar.tsx";
import Contact from "./routes/contact.tsx";
import NotFound from "./routes/errors/404.tsx";
import { Container } from "./components/layout/Container.tsx";
import Over from "./routes/over.tsx";
import OpenWerken from "./routes/onderwerpen/openwerken.tsx";
import Proeftuin from "./routes/onderwerpen/proeftuin.tsx";
import Ontwerp from "./routes/onderwerpen/ontwerp.tsx";
import Breadcrumb from "./components/layout/Breadcrumb.tsx";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.tsx";
import Zoeken from "./routes/zoeken.tsx";
import Weekly, { WeeklyDetail } from "./routes/actueel/weekly";
import Presentaties, { PresentatieDetail } from "./routes/actueel/presentaties";
import Actueel from "./routes/actueel";

function App() {
  return (
    <Router>
      <BreadcrumbProvider>
        <div className="rhc-theme moza-theme-overrides flex min-h-screen flex-col">
          <Header />
          <Navbar />
          <Breadcrumb />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/actueel" element={<Actueel />} />
              <Route path="/over-MOZa" element={<Over />} />
              <Route path="/actueel/weekly/" element={<Weekly />} />
              <Route path="/actueel/weekly/:slug" element={<WeeklyDetail />} />
              <Route path="/actueel/presentaties/" element={<Presentaties />} />
              <Route
                path="/actueel/presentaties/:slug"
                element={<PresentatieDetail />}
              />
              <Route path="/onderwerpen" element={<OnderwerpenLijst />} />
              <Route
                path="/onderwerpen/profiel-service"
                element={<Profielservice />}
              />
              <Route path="/onderwerpen/portaal" element={<Portaal />} />
              <Route path="/onderwerpen/open-werken" element={<OpenWerken />} />
              <Route path="/onderwerpen/proeftuin" element={<Proeftuin />} />
              <Route path="/onderwerpen/ontwerp" element={<Ontwerp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/toegankelijkheid" element={<Toegankelijkheid />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/zoeken" element={<Zoeken />} />
            </Routes>
          </main>
          <footer className="h-auto w-full bg-[#154273] p-4 pb-8">
            <Container>
              <div className="flex flex-col justify-between px-4 pt-5 min-[900px]:flex-row">
                <div className="serif mb-8 text-2xl text-white italic">
                  Eén Overheid. Voor iedereen!
                </div>
                <div className="mr-8 flex gap-16">
                  <dl className="text-white">
                    <dt className="mb-2 text-2xl">Over deze site</dt>
                    <dd>
                      <ul className="text-lg">
                        {/* <li>
                        <a href="#">Copyright</a>
                      </li> */}
                        <li>
                          <Link to="/privacy">Privacy</Link>
                        </li>
                        {/* <li>
                        <a href="#">Cookies</a>
                      </li> */}
                        <li>
                          <Link to="/toegankelijkheid">Toegankelijkheid</Link>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </Container>
          </footer>
        </div>
      </BreadcrumbProvider>
    </Router>
  );
}

export default App;
