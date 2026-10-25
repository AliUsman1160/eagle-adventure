import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Choose Your Adventure", text: "Explore experiences and find the journey that suits you." },
  { n: "02", title: "Get in Touch", text: "Ask questions and confirm the trip details directly with the company." },
  { n: "03", title: "Get Ready to Explore", text: "Prepare for the journey after the company confirms the arrangements." },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="SIMPLE FROM START TO FINISH"
          title="How It Works"
          text="A general overview of how planning a trip with the club works."
        />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-[3.25rem] right-[3.25rem] top-7 hidden h-px border-t border-dashed border-forest/30 md:block" />
          {steps.map((s, i) => (
            <li key={s.n} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <Reveal delay={i * 0.1} className="flex gap-5 md:flex-col md:items-center">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-forest bg-cream font-heading text-lg font-extrabold text-forest">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-xl text-forest">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted md:mx-auto md:max-w-xs">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-center text-sm text-grey">This website is for inquiries only — nothing is booked or confirmed automatically.</p>
      </Container>
    </section>
  );
}
