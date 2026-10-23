import Image from 'next/image';
import Animate from './Animate';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-gradient-to-r from-[#D5F7FF] to-[#B3F2FF]">
      {/* Contact: form + office details */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <Animate variant="left">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--brand-primary)]">
              Contact Us
            </p>
          </Animate>
          <Animate variant="left" delay={0.12}>
            <h2 className="mt-3 text-3xl font-bold text-[#0a0a0a] md:text-4xl">
              Let&apos;s Build Better Healthcare Experiences Together
            </h2>
          </Animate>
          <Animate variant="left" delay={0.24}>
            <p className="mt-5 text-slate-600">
              Tell us about your hospital or clinic goals. Our team will help you design the right
              digital transformation roadmap.
            </p>
          </Animate>
          <Animate variant="left" delay={0.36}>
            <div className="hover-lift mt-7 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-[#111111]">Email</p>
              <a href="mailto:amiedhiman@gmail.com" className="mt-1 block text-lg font-bold text-[var(--brand-primary)]">
                amiedhiman@gmail.com
              </a>
            </div>
          </Animate>

          <Animate variant="left" delay={0.48}>
            <div className="relative mt-6 h-56 overflow-hidden rounded-2xl border border-white/70 shadow-lg">
              <Image
                src="/assets/images/new/7.jpg"
                alt="Healthcare support"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-[1.04]"
              />
            </div>
          </Animate>
        </div>

        <Animate variant="right" delay={0.24}>
        <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            />
            <input
              type="text"
              placeholder="Organization"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300 sm:col-span-2"
            />
            <textarea
              placeholder="How can we help you?"
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300 sm:col-span-2"
            />
          </div>
          <button
            type="button"
            className="btn-glow sheen-hover mt-6 inline-flex rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1f53]"
          >
            Send Message
          </button>
        </form>
        </Animate>
      </div>
    </section>
  );
}
