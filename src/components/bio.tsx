import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

type QueryProps = {
  site: {
    siteMetadata: {
      tagline: string;
      author: {
        name: string;
        summary: string;
      };
      social: {
        github: string;
      };
    };
  };
};

export default function Bio() {
  const data = useStaticQuery<QueryProps>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          tagline
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  const { tagline, author, social } = data.site.siteMetadata;

  return (
    <div>
      <h3>{tagline}</h3>
      <p>
        A technical blog by <a href={social.github}>{author.name}</a>
        <br />
        {author.summary}
      </p>
    </div>
  );
}
