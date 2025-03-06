import { Organization, WebSite, Article, BreadcrumbList } from 'schema-dts';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'article' | 'breadcrumb';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {};

  switch (type) {
    case 'organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SingRank',
        url: 'https://singrank.com',
        logo: 'https://singrank.com/images/logo.png',
        description: 'Premier SEO Agency in Singapore helping businesses achieve digital excellence',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Your Street Address',
          addressLocality: 'Singapore',
          postalCode: 'Your Postal Code',
          addressCountry: 'SG'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+65-XXXX-XXXX',
          contactType: 'customer service',
          areaServed: 'SG',
          availableLanguage: ['en']
        },
        sameAs: [
          'https://www.facebook.com/singrank',
          'https://twitter.com/singrank',
          'https://www.linkedin.com/company/singrank'
        ]
      };
      break;

    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SingRank',
        url: 'https://singrank.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://singrank.com/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      };
      break;

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'SingRank',
          logo: {
            '@type': 'ImageObject',
            url: 'https://singrank.com/images/logo.png'
          }
        },
        datePublished: data.date,
        dateModified: data.modifiedDate || data.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://singrank.com/blog/${data.slug}`
        }
      };
      break;

    case 'breadcrumb':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 