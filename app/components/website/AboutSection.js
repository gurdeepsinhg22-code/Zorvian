import Image from 'next/image';
import Animate from './Animate';

export default function AboutSection() {
  return (
    <section id="about-gallery" className="relative overflow-hidden border-y border-slate-200 bg-white py-16 sm:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: Image collage - 2 top + 1 full-width bottom */}
          <Animate variant="left" className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <div className="overflow-hidden rounded-3xl border border-cyan-100 bg-white p-2 shadow-lg">
                <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/images/new/2.jpg"
                    alt="Healthcare team discussion"
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-cyan-100 bg-white p-2 shadow-lg">
                <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/images/new/3.jpg"
                    alt="Clinical digital workflow"
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="col-span-2 overflow-hidden rounded-3xl border border-cyan-100 bg-white p-2 shadow-lg">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/images/new/4.jpg"
                    alt="Medical software analytics"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* Right: Text content */}
          <div>
            <Animate variant="right">
              <span className="inline-flex items-center rounded-full bg-[#EAF9FD] px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#111111]">
                Healthcare Professionals
              </span>
            </Animate>
            <Animate variant="right" delay={0.08}>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-[#0a0a0a] sm:text-3xl md:text-4xl">
                Engineered for
                <span className="mt-2 block text-3xl sm:text-4xl md:text-5xl">Healthcare Professionals</span>
              </h2>
            </Animate>
            <Animate variant="right" delay={0.16}>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Our solutions are engineered to support busy healthcare professionals with faster, smarter
                workflows. We help reduce administrative burden by simplifying routine tasks like scheduling,
                documentation, follow-ups, and coordination across departments.
              </p>
            </Animate>
            <Animate variant="right" delay={0.24}>
              <p className="mt-4 text-slate-600 leading-relaxed">
                With everything organized in one place, clinicians can quickly access the right patient
                information, reduce delays, and improve decision-making during consultations.
              </p>
            </Animate>
            <Animate variant="right" delay={0.32}>
              <a
                href="/about-us"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] transition hover:gap-3"
              >
                Learn more about us <span>→</span>
              </a>
            </Animate>
          </div>
        </div>
      </div>
    </section>
  );
}
