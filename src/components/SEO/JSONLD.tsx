import { Metadata } from 'next';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Liguns Entertainment',
  url: 'https://ligunsentertainment.agency',
  logo: 'https://ligunsentertainment.agency/assets/img/Logo%20Liguns.png',
  description: 'Liguns Entertainment adalah agency hiburan malam terpercaya di Indonesia. Kami menyediakan talent management profesional untuk nightclub, bar, dan venue hiburan.',
  foundingDate: '2019',
  areaServed: [
    'Bandung',
    'Jakarta', 
    'Bali',
    'Surabaya',
    'Tangerang',
    'Indonesia'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+6289669094929',
    contactType: 'customer service',
    availableLanguage: ['Indonesian', 'English'],
    areaServed: 'ID'
  },
  sameAs: [
    'https://instagram.com/ligunsentertainment',
    'https://facebook.com/ligunsentertainment',
    'https://twitter.com/ligunsent'
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
    addressRegion: 'Jawa Barat',
    addressLocality: 'Bandung'
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Liguns Entertainment',
  image: 'https://ligunsentertainment.agency/assets/img/Logo%20Liguns.png',
  description: 'Agency hiburan malam dan talent management profesional di Indonesia. Menyediakan Hostess, GRO, Bartender, dan berbagai posisi hiburan malam lainnya.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bandung',
    addressLocality: 'Bandung',
    addressRegion: 'Jawa Barat',
    postalCode: '40111',
    addressCountry: 'ID'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-6.917464',
    longitude: '107.619123'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday', 
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '18:00',
    closes: '02:00'
  },
  priceRange: '$$',
  telephone: '+6289669094929',
  email: 'info@ligunsentertainment.agency',
  url: 'https://ligunsentertainment.agency',
  areaServed: [
    {
      '@type': 'City',
      name: 'Bandung'
    },
    {
      '@type': 'City', 
      name: 'Jakarta'
    },
    {
      '@type': 'City',
      name: 'Bali'
    },
    {
      '@type': 'City',
      name: 'Surabaya'
    },
    {
      '@type': 'City',
      name: 'Tangerang'
    },
    {
      '@type': 'Country',
      name: 'Indonesia'
    }
  ],
  serviceType: [
    'Talent Recruitment',
    'Event Organizer',
    'Nightlife Management',
    'Entertainment Agency'
  ]
};

export const corporationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'Liguns Entertainment',
  tickerSymbol: 'LIGUNS',
  description: 'Premier nightlife entertainment and talent management agency in Indonesia.',
  foundingDate: '2019',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 10,
    maxValue: 50,
    value: 25
  },
  industry: 'Entertainment',
  sector: 'Hospitality'
};

interface JSONLDScriptProps {
  schema?: 'organization' | 'localBusiness' | 'corporation' | 'all';
}

export default function JSONLDScript({ schema = 'all' }: JSONLDScriptProps) {
  const schemas: object[] = [];

  if (schema === 'organization' || schema === 'all') {
    schemas.push(organizationSchema);
  }

  if (schema === 'localBusiness' || schema === 'all') {
    schemas.push(localBusinessSchema);
  }

  if (schema === 'corporation' || schema === 'all') {
    schemas.push(corporationSchema);
  }

  const jsonLd = schemas.length === 1 
    ? JSON.stringify(schemas[0])
    : JSON.stringify(schemas);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

// Re-export for convenience
export const jsonLd = {
  organization: organizationSchema,
  localBusiness: localBusinessSchema,
  corporation: corporationSchema
};
