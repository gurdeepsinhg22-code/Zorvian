const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com';

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zorvian Digital Solutions',
    url: BASE_URL,
    description:
      'Zorvian Digital Solutions — professional web development, web applications, and custom digital solutions for businesses.',
    publisher: {
      '@type': 'Organization',
      name: 'Zorvian Digital Solutions',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/images/zorvian-digital-logo.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zorvian Digital Solutions',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/zorvian-digital-logo.png`,
    description:
      'Zorvian Digital Solutions delivers high-performance websites, web applications, and digital solutions focused on performance, security, and user experience.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mohali',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'amiedhiman@gmail.com',
      contactType: 'sales',
      areaServed: 'IN',
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebPageJsonLd({ name, description, url }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${BASE_URL}${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Zorvian Digital Solutions',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/images/zorvian-digital-logo.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SoftwareApplicationJsonLd({ name, description, url }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${BASE_URL}${url}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
