import { faqPreview } from "@/data/faqs";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";

export default function FAQPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="GOOD TO KNOW"
            title="Questions, Answered"
            text="Quick answers to common questions. Specific requirements always depend on the trip."
          />
          <ButtonLink href="/faq" variant="secondary" className="mt-8">See All FAQs</ButtonLink>
        </div>
        <Accordion items={faqPreview} />
      </Container>
    </section>
  );
}
