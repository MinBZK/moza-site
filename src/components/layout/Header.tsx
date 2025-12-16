export function Header() {
  return (
    <header className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-3 px-3 md:grid-cols-3">
      <div className="justify-self-center md:justify-self-start">
        <p className="!mb-0 text-lg font-bold">MijnOverheid Zakelijk</p>
        <p className="!mb-0 font-serif italic">Overzicht in wat er speelt</p>
      </div>

      <div className="justify-self-center">
        <img
          src="/logo.svg"
          alt="Logo Rijksoverheid"
          id="logotype"
          className="h-auto max-w-full"
        />
      </div>

      <div className="hidden md:block" />
    </header>
  );
}
