import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from '../../content/icons/icon-logo.svg';
import { ReactComponent as IconHome } from '../../content/icons/icon-home.svg';
import { ReactComponent as IconGitHub } from '../../content/icons/icon-github.svg';
import { ReactComponent as IconTwitter } from '../../content/icons/icon-twitter.svg';
import { ReactComponent as IconRSS } from '../../content/icons/icon-rss.svg';
import { md, mediaQuery } from '../styles/responsive';

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
        twitter: string;
      };
    };
  };
};

const Container = styled.footer`
  background-color: var(--color-blue-800);
  color: var(--color-gray-100);
  padding: var(--spacing-sm);

  h3 {
    margin-top: 0;
  }
  ${mediaQuery(md)} {
    display: grid;
    grid-template-columns: min-content auto repeat(5, max-content);
    grid-template-rows: auto auto;
    padding: var(--spacing-sm) var(--spacing-xxl);

    h3,
    p {
      grid-column: 2 / 3;
      margin: 0;
    }
  }
  a {
    --color-link: transparent;
    align-items: center;
    align-self: center;
    color: inherit;
    display: flex;

    ${mediaQuery(md)} {
      display: inline-flex;
    }
    &:not(:last-of-type) {
      margin-right: var(--spacing-sm);
    }
    &:active svg {
      color: var(--color-gray-100);
    }
    svg {
      color: var(--color-orange-800);
      height: 1em;
      margin-right: var(--spacing-xxs);
      width: 1em;
    }
  }
`;

const StyledLogo = styled(Logo)`
  display: none;
  grid-row: 1 / -1;
  margin-right: var(--spacing-md);

  ${mediaQuery(md)} {
    display: block;
  }
`;

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
            twitter
          }
        }
      }
    }
  `);

  const { tagline, author, social } = data.site.siteMetadata;

  return (
    <Container>
      <StyledLogo width="100px" height="100px" />
      <h3>{tagline}</h3>
      <p>
        A technical blog by {author.name}.
        <br />
        {author.summary}
      </p>
      <Link to="/">
        <IconHome /> Home
      </Link>
      <a href={`https://twitter.com/${social.twitter}`}>
        <IconTwitter /> Twitter
      </a>
      <a href={`https://github.com/${social.github}`}>
        <IconGitHub /> GitHub
      </a>
      <Link to="/rss.xml">
        <IconRSS /> RSS
      </Link>
    </Container>
  );
}
