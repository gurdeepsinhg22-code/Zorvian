import Animate from './Animate';
import Container from '../marketing/ui/Container';
import MarketingProjectsCarousel from './MarketingProjectsCarousel';
import { caseStudies } from '../../../lib/marketing/caseStudies';

const projects = caseStudies.map(({ title, image, slug }) => ({
  title,
  image,
  href: `/case-studies/${slug}`,
}));

export default function MarketingProjectsGridSection() {
  return (
    <section
      id="recent-projects"
      className="relative overflow-x-hidden bg-[var(--marketing-page-bg,#f4f5f9)] py-14 sm:py-16 md:py-20"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Animate variant="down">
            <div className="flex justify-center">
              <p className="ref-kicker text-sm sm:text-base">
                <span className="ref-kicker-line" aria-hidden />
                Case studies
              </p>
            </div>
            <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.5rem] md:leading-tight">
              Explore Our Work & Recent Projects
            </h2>
            <p className="mt-4 text-base text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              We deliver high-quality web development solutions for businesses across various industries. Our recent
              projects showcase our expertise in modern design, performance optimization, and scalable development
              tailored to real business needs.
            </p>
          </Animate>
          <Animate variant="up" delay={0.1}>
            <div className="flex justify-center">
              <a href="/case-studies" className="ref-cta-primary mt-8">
                View case studies
              </a>
            </div>
          </Animate>
        </div>
      </Container>

      <Animate variant="up" delay={0.12}>
        <div className="relative mt-12 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 px-0">
          <MarketingProjectsCarousel projects={projects} ariaLabel="Explore recent projects" />
        </div>
      </Animate>
    </section>
  );
}
