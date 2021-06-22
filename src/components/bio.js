import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export default function Bio() {
  const data = useStaticQuery(graphql`
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
