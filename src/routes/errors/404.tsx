import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-350px)] flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-[#154273] sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Pagina niet gevonden
              </h1>
              <p className="mt-1 text-base text-gray-500">
                De pagina die u zoekt bestaat niet of is verplaatst.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center rounded-md bg-[#154273] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a5287] focus:ring-2 focus:ring-[#154273] focus:ring-offset-2 focus:outline-none"
              >
                Terug naar home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-[#154273] bg-white px-4 py-2 text-sm font-semibold text-[#154273] hover:bg-gray-50 focus:ring-2 focus:ring-[#154273] focus:ring-offset-2 focus:outline-none"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
