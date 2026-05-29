import { notFound } from 'next/navigation';
import SiteFooter from '../../components/website/SiteFooter';
import CaseStudyDetailContent from '../../components/website/CaseStudyDetailContent';
import { WebPageJsonLd } from '../../components/website/JsonLd';
import { buildSeoMetadata } from '../../../lib/seo';
import { getCaseStudyBySlug, getCaseStudySlugs } from '../../../lib/marketing/caseStudies';

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: 'Case Study Not Found' };

  return buildSeoMetadata({
    title: `${study.title} Case Study | MedHostech Solutions`,
    description: study.metaDescription,
    path: `/case-studies/${study.slug}`,
    ogImage: study.image.startsWith('http')
      ? study.image
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com'}${study.image}`,
  });
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name={`${study.title} Case Study | MedHostech Solutions`}
        description={study.metaDescription}
        url={`/case-studies/${study.slug}`}
      />

      <CaseStudyDetailContent study={study} />
      <SiteFooter />
    </main>
  );
}
