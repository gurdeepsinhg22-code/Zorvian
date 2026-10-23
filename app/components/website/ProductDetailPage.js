import Image from 'next/image';
import Animate from './Animate';
import InnerPageHeroBanner from './InnerPageHeroBanner';
import SiteFooter from './SiteFooter';
import { SoftwareApplicationJsonLd } from './JsonLd';

export default function ProductDetailPage({
  title,
  subtitle,
  tagline,
  description,
  breadcrumb,
  image,
  features = [],
  benefits = [],
  productSlug,
}) {
  const productUrl = productSlug ? `/products/${productSlug}` : null;

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      {productUrl && (
        <SoftwareApplicationJsonLd
          name={title}
          description={description}
          url={productUrl}
        />
      )}

      <InnerPageHeroBanner title={title} breadcrumbCurrent={breadcrumb} subtitle={subtitle} />

      {/* Intro + Image */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              {tagline && (
                <Animate variant="left">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                    {tagline}
                  </p>
                </Animate>
              )}
              <Animate variant="left" delay={0.08}>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
              </Animate>
              <Animate variant="left" delay={0.16}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/contact-us"
                    className="inline-flex rounded-full bg-[var(--brand-primary)] px-8 py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(0,180,216,0.35)] transition hover:bg-[var(--brand-primary-dark)]"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/products"
                    className="inline-flex rounded-full border border-[var(--brand-primary)] px-8 py-3.5 font-semibold text-[var(--brand-primary)] transition hover:bg-[var(--brand-primary)]/10"
                  >
                    View All Products
                  </a>
                </div>
              </Animate>
            </div>
            {image && (
              <Animate variant="right" delay={0.12}>
                <div className="relative h-80 overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_48px_-12px_rgba(14,39,64,0.15)] sm:h-96">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-500 hover:scale-[1.02]"
                  />
                </div>
              </Animate>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      {features?.filter((f) => (typeof f === 'string' ? f : f?.title || f?.desc)).length > 0 && (
        <section className="relative overflow-hidden bg-[#FAFCFE] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Animate variant="down">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                Key Features
              </p>
            </Animate>
            <Animate variant="down" delay={0.08}>
              <h2 className="mt-4 text-2xl font-bold text-[#0a0a0a] sm:text-3xl md:text-4xl">
                Key Features of {title}
              </h2>
            </Animate>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.filter((f) => (typeof f === 'string' ? f : f?.title || f?.desc)).map((feature, idx) => {
                const title = typeof feature === 'string' ? feature : feature?.title || '';
                const desc = typeof feature === 'string' ? null : feature?.desc;
                if (!title) return null;
                return (
                  <Animate key={`${title}-${idx}`} variant="up" delay={0.12 + idx * 0.06}>
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] transition hover:border-cyan-200/60 hover:shadow-[0_16px_40px_-8px_rgba(2,105,148,0.12)]">
                      <h3 className="text-lg font-bold text-[#0a0a0a]">{title}</h3>
                      {desc && <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>}
                    </div>
                  </Animate>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {benefits?.filter((b) => (typeof b === 'string' ? b : b?.title || b?.desc)).length > 0 && (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Animate variant="down">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                Benefits
              </p>
            </Animate>
            <Animate variant="down" delay={0.08}>
              <h2 className="mt-4 text-2xl font-bold text-[#0a0a0a] sm:text-3xl md:text-4xl">
                Why Choose {title}?
              </h2>
            </Animate>
            <div className="mt-10 flex flex-wrap gap-3">
              {benefits.filter((b) => (typeof b === 'string' ? b : b?.title || b?.desc)).map((benefit, idx) => {
                const text = typeof benefit === 'string' ? benefit : benefit?.title || benefit?.desc || '';
                if (!text) return null;
                return (
                  <Animate key={`${text}-${idx}`} variant="up" delay={0.12 + idx * 0.03}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-[#EAF9FD] px-4 py-2 text-sm font-medium text-[#0a0a0a]">
                      <span className="h-2 w-2 rounded-full bg-[var(--brand-primary)]" />
                      {text}
                    </span>
                  </Animate>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#F8FBFD] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Animate variant="scale">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/50 bg-gradient-to-r from-[#55C6DE] via-[#44BEDA] to-[#1EB4D7] text-white shadow-[0_24px_55px_rgba(5,88,112,0.22)]">
              <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-8 py-14 text-center md:flex-row md:justify-between md:px-12 md:py-14 md:text-left">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    Ready to Transform Your Healthcare Operations?
                  </h2>
                  <p className="mt-3 text-cyan-50/95">
                    Join thousands of healthcare providers who trust Zorvian Digital Solutions for their digital needs.
                  </p>
                </div>
                <a
                  href="/contact-us"
                  className="sheen-hover shrink-0 rounded-full bg-white px-10 py-4 text-base font-semibold text-[#0E2740] shadow-[0_10px_24px_rgba(2,18,34,0.16)] transition hover:-translate-y-0.5"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
