import { Container } from "../layout/Container.tsx";

interface HeroProps {
  title: string;
  subtitle?: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img src={"hero.webp"} alt={""} className="h-full w-full object-cover" />
      <div className="xs:mr-4 absolute inset-0 mr-4 flex items-center sm:mr-0">
        <Container className="flex items-center">
          <div className="mb-auto -ml-3 rounded-xs rounded-tr-4xl bg-[#dce3ea] py-5 pr-6 pl-7 text-slate-700 lg:w-2/5">
            <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="!mb-0 text-base font-medium text-slate-800 sm:text-lg md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
