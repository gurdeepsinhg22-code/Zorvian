import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import SiteFooter from '../components/website/SiteFooter';
import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Products - Zorvian Digital Solutions | EHR & Healthcare Management Solutions',
  description:
    'Explore Zorvian Digital Solutions product ecosystem: Patient Management, Staff Management, Telemedicine, Appointment Management, Billing, and Roster Management for healthcare.',
  path: '/products',
});

async function getProducts() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/products`, { next: { revalidate: 60 } });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map((p) => ({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        href: `/products/${p.slug}`,
      }));
    }
  } catch {
    // API unreachable during build (e.g. CI) - return empty
  }
  return [];
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner
        title="Products"
        breadcrumbCurrent="Products"
        subtitle="Comprehensive solutions tailored to your healthcare facility’s unique needs — explore our blog for insights."
      />

      {/* Product Grid */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Animate variant="down">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                Zorvian Digital Solutions Product Ecosystem
              </p>
            </Animate>
            <Animate variant="down" delay={0.12}>
              <h2 className="mt-4 text-3xl font-bold text-[#0a0a0a] md:text-4xl">
                Comprehensive Healthcare Solutions
              </h2>
            </Animate>
            <Animate variant="down" delay={0.2}>
              <p className="mt-3 text-slate-600">
                Built for modern hospitals and clinics with smarter workflows and reliable automation.
              </p>
            </Animate>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <p className="text-slate-600">No products available at the moment. Please check back later.</p>
              </div>
            ) : (
              products.map((product, idx) => (
                <Animate key={product.slug} variant="up" delay={0.2 + idx * 0.08}>
                  <a
                    href={product.href}
                    className="group block rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] transition hover:border-cyan-200 hover:shadow-[0_24px_48px_-12px_rgba(2,105,148,0.16)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-100 bg-[#EAF9FD] text-xl font-bold text-[var(--brand-primary)] transition group-hover:scale-105">
                      {product.title.charAt(0)}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#0a0a0a]">{product.title}</h3>
                    <p className="mt-3 text-slate-600">{product.subtitle}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                      Learn more <span className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </Animate>
              ))
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
