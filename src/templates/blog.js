import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import App from '../components/app';
import Header from '../components/header';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Bio from '../components/bio';
import { mediaQuery, md, lg } from '../styles/responsive';
import { Main, contentWrapper } from '../styles/global';

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
        tags
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

const Masthead = styled.div`
  padding: var(--spacing-content);
`;

const ContentWrapper = styled.div`
  ${contentWrapper};
`;

const Article = styled.article`
  ${mediaQuery(md)} {
    display: grid;
    grid-template-areas:
      'empty header'
      'sidebar body';
    grid-template-columns: 200px minmax(0, 1fr);
    grid-gap: var(--spacing-md) var(--spacing-xxl);
  }
  ${mediaQuery(lg)} {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  h2 {
    margin-top: var(--spacing-md);
  }
  .gatsby-resp-image-wrapper {
    margin: 0 0 var(--spacing-md) 0 !important;
  }
`;

const Heading = styled.header`
  grid-area: header;
`;

const Body = styled.div`
  grid-area: body;
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  display: none;

  ${mediaQuery(md)} {
    display: block;
  }
`;

const ArticleMeta = styled.div`
  font-size: var(--text-size-delta);
  line-height: var(--text-line-height-delta);
`;

const Separator = styled.span`
  margin: 0 var(--spacing-xs);
`;

const TableOfContents = styled.div`
  font-size: var(--text-size-delta);
  line-height: var(--text-line-height-delta);
  position: sticky;
  top: clamp(var(--spacing-xs), 5vmin, var(--spacing-xl));
`;

const TableOfContentsHeading = styled.h3`
  border-bottom: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    to right,
    var(--color-link-gradient-1),
    var(--color-link-gradient-2)
  );
  color: var(--color-text-light);
  font-size: var(--text-size-delta);
  font-weight: normal;
  letter-spacing: 0.2em;
  line-height: var(--text-line-height-delta);
  text-transform: uppercase;
`;

const QuickLinks = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: var(--spacing-xs) 0;
  }
  a:not(:active) {
    --color-link: transparent;
    color: inherit;

    &.active {
      background-size: var(--border-hover);
    }
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledBio = styled.footer`
  border: 1px solid var(--color-border);
  border-width: 1px 0;
  margin: var(--spacing-md) 0;
`;

const getHeadingIds = (items) => items?.map((i) => i.url) ?? [];

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
    <App location={location} title={site.siteMetadata.title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Masthead>
        <Header />
      </Masthead>
      <Main>
        <ContentWrapper>
          <Article itemScope itemType="http://schema.org/Article">
            <Heading>
              <h1 itemProp="headline">{post.frontmatter.title}</h1>
              <ArticleMeta>
                <time dateTime={post.frontmatter.isoDate} itemProp="datePublished">
                  {post.frontmatter.date}
                </time>
                <Separator>·</Separator>
                {post.timeToRead} min read
              </ArticleMeta>
              <Tags tags={post.frontmatter.tags} />
            </Heading>
            {post.tableOfContents.items ? (
              <Sidebar>
                <TableOfContents>
                  <TableOfContentsHeading>Table of contents</TableOfContentsHeading>
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
            ) : null}
            <Body>
              <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
            </Body>
          </Article>

          <StyledBio>
            <Bio />
          </StyledBio>

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
        </ContentWrapper>
      </Main>
    </App>
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
