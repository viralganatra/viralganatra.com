import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type SEOProps = {
  lang?: string;
  meta?: {
    name: string;
    content: string;
  }[];
  title: string;
  description?: string;
};

type QueryProps = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      social: {
        twitter: string;
      };
    };
  };
};

export default function SEO({ lang = 'en', meta = [], title, description }: SEOProps) {
  const { site } = useStaticQuery<QueryProps>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.social.twitter,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        ...meta,
      ]}
    >
      <html lang={lang} />
    </Helmet>
  );
}
