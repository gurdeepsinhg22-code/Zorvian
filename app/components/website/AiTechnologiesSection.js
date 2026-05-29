import Container from '../marketing/ui/Container';
import AiTechnologiesBlock from './AiTechnologiesBlock';

export default function AiTechnologiesSection() {
  return (
    <section
      id="ai-technologies"
      className="relative scroll-mt-28 border-t border-slate-200/80 bg-[var(--marketing-page-bg,#f4f5f9)] py-14 sm:py-16 md:py-20"
      aria-labelledby="ai-technologies-heading"
    >
      <Container>
        <AiTechnologiesBlock />
      </Container>
    </section>
  );
}
