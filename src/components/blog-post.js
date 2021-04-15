import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import SEO from './seo';
import * as tokens from '../styles/design-tokens';
import { lg, mediaQuery } from '../styles/responsive';

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
      }
      tableOfContents
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title: metaTitle
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title: metaTitle
      }
    }
  }
`;

const Article = styled.article`
  ${mediaQuery(lg)} {
    display: grid;
    grid-template-areas:
      'empty header'
      'sidebar body';
    grid-template-columns: 250px calc(var(--site-max-width) - 250px - ${tokens.TOKEN_SPACING_LG});
    grid-gap: ${tokens.TOKEN_SPACING_MD} ${tokens.TOKEN_SPACING_LG};
  }

  h2 {
    margin-top: ${tokens.TOKEN_SPACING_MD};
  }
  .gatsby-resp-image-wrapper {
    margin-bottom: ${tokens.TOKEN_SPACING_MD};
  }
`;

const Header = styled.header`
  grid-area: header;
`;

const Body = styled.div`
  grid-area: body;
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  display: none;

  ${mediaQuery(lg)} {
    display: block;
  }
`;

const Title = styled.h1`
  margin-top: 0;
`;

const ArticleMeta = styled.div`
  font-size: ${tokens.TOKEN_FONT_SIZE_DELTA};
  line-height: ${tokens.TOKEN_LINE_HEIGHT_DELTA};
`;

const Separator = styled.span`
  margin: 0 ${tokens.TOKEN_SPACING_XS};
`;

const TableOfContents = styled.div`
  font-size: ${tokens.TOKEN_FONT_SIZE_DELTA};
  line-height: ${tokens.TOKEN_LINE_HEIGHT_DELTA};
  position: sticky;
  top: clamp(${tokens.TOKEN_SPACING_XS}, 5vmin, ${tokens.TOKEN_SPACING_XL});

  h2 {
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      to right,
      var(--gradient-color-primary),
      var(--gradient-color-secondary)
    );
    color: #78757f;
    font-size: ${tokens.TOKEN_FONT_SIZE_DELTA};
    letter-spacing: 0.2em;
    line-height: ${tokens.TOKEN_LINE_HEIGHT_DELTA};
    font-weight: normal;
    text-transform: uppercase;
  }
`;

const QuickLinks = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: ${tokens.TOKEN_SPACING_XS} 0;
  }
  a {
    background-image: linear-gradient(to right, transparent, transparent),
      linear-gradient(to right, var(--gradient-color-primary), var(--gradient-color-secondary));
    color: inherit;
    padding: ${tokens.TOKEN_SPACING_XXS} 0;

    &:active {
      background-color: inherit;
    }
    &.active {
      background-image: linear-gradient(to right, var(--link-color), var(--link-color)),
        linear-gradient(to right, var(--gradient-color-primary), var(--gradient-color-secondary));
    }
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const getHeadingIds = (items) => items.map((i) => i.url);

export default function BlogPostTemplate({ data, location }) {
  const [activeId, setActiveId] = useState();
  const { mdx: post, previous, next, site } = data;

  useEffect(() => {
    const headingIds = getHeadingIds(post.tableOfContents.items);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    });

    headingIds.forEach((id) => {
      const element = document.querySelector(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headingIds.forEach((id) => {
        const element = document.querySelector(id);

        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [post.tableOfContents.items]);

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Article itemScope itemType="http://schema.org/Article">
        <Header>
          <Title itemProp="headline">{post.frontmatter.title}</Title>
          <ArticleMeta>
            <time dateTime={post.frontmatter.isoDate} itemProp="datePublished">
              {post.frontmatter.date}
            </time>
            <Separator>·</Separator>
            {post.timeToRead} min read
          </ArticleMeta>
        </Header>
        <Sidebar>
          <TableOfContents>
            <h2>Table of contents</h2>
            <QuickLinks>
              {post.tableOfContents.items.map(({ title, url }) => (
                <li key={url}>
                  <a href={url} className={activeId === url.slice(1) ? 'active' : null}>
                    {title}
                  </a>
                </li>
              ))}
            </QuickLinks>
          </TableOfContents>
        </Sidebar>
        <Body>
          <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
        </Body>
      </Article>

      <hr />
      <nav>
        <NavList>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </NavList>
      </nav>
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        isoDate: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
      excerpt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    }).isRequired,
    previous: PropTypes.shape(),
    next: PropTypes.shape(),
  }).isRequired,
  location: PropTypes.shape().isRequired,
};
