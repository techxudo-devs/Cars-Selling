import Link from "next/link";

type Section = {
  heading: string;
  body: string;
};

type SeoLandingPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: Section[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function SeoLandingPage({
  eyebrow,
  title,
  introduction,
  sections,
  primaryCta = { label: "Browse Available Cars", href: "/available-cars/" },
  secondaryCta = { label: "Request a Car from Japan", href: "/how-we-deliver/" },
}: SeoLandingPageProps) {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white md:px-10">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f23410]">
          {eyebrow}
        </p>
        <h1 className="orb max-w-5xl text-3xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-7 text-gray-300 md:text-lg">
          {introduction}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primaryCta.href} className="rounded-full bg-[#f23410] px-6 py-3 font-semibold text-white transition hover:bg-[#d92c0f]">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="rounded-full border border-[#f23410] px-6 py-3 font-semibold text-[#f23410] transition hover:bg-[#f23410] hover:text-white">
            {secondaryCta.label}
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.heading} className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="orb text-xl font-bold text-[#f23410]">{section.heading}</h2>
            <p className="mt-4 leading-7 text-gray-300">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
