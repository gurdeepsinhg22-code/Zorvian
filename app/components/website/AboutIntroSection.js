import Animate from './Animate';

export default function AboutIntroSection() {
  return (
    <section id="about" className="relative mt-[50px] bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div>
            <Animate variant="left">
              <p className="ref-kicker text-sm sm:text-base">
                <span className="ref-kicker-line" aria-hidden />
                About us our company
              </p>
            </Animate>
            <Animate variant="left" delay={0.1}>
              <h2 className="ref-section-title mt-6 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                Committed to Delivering the Best Service
              </h2>
            </Animate>
          </div>

          <Animate variant="right" delay={0.08}>
            <p className="text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              MedHostech Solutions is a trusted web development company focused on creating fast, secure, and
              user-friendly websites. We specialize in custom development, CMS solutions, and business websites that
              convert visitors into customers.
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}
