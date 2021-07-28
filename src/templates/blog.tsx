import React, { useEffect, useState } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import styled from '@emotion/styled';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import App from '../components/app';
import Header from '../components/header';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Bio from '../components/bio';
import { mediaQuery, md, lg } from '../styles/responsive';
import { Main, contentWrapper } from '../styles/global';

type tableOfContentsItems = Array<{
  url: string;
  title: string;
}>;

type BlogPostTemplateQuery = PageProps & {
  data: {
    mdx: {
      id: number;
      excerpt: string;
      body: string;
      timeToRead: number;
      frontmatter: {
        title: string;
        date: string;
        isoDate: string;
        description?: string;
        tags: Array<string>;
      };
      tableOfContents: {
        items: tableOfContentsItems;
      };
    };
    previous?: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
    next?: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  };
};

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
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
      'header header'
      'sidebar body';
    grid-template-columns: 200px minmax(0, 1fr);
    grid-gap: var(--spacing-md) var(--spacing-xxl);
  }
  ${mediaQuery(lg)} {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  h2 {
    margin: var(--spacing-lg) 0 var(--spacing-md) 0;
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

  ul,
  ol {
    counter-reset: counter;
    list-style: none;

    li {
      counter-increment: counter;
      margin: var(--spacing-xs) 0;
      position: relative;

      &::before {
        --size: 32px;

        background: var(--color-link);
        border-radius: 50%;
        color: var(--color-text-invert);
        content: counter(counter);
        height: var(--size);
        left: calc(-1 * var(--size) - var(--spacing-xs));
        line-height: var(--size);
        position: absolute;
        text-align: center;
        top: calc(50% - (var(--size) / 2));
        width: var(--size);
      }
    }
  }
  ul li::before {
    --size: 16px;
    content: '';
  }
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
  color: var(--color-gray-600);
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

const OtherPosts = styled.nav`
  border-top: 1px solid var(--color-gray-600);
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg) 0;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const getHeadingIds = (items: tableOfContentsItems) => items?.map((i) => i.url) ?? [];

export default function BlogPostTemplate({ data, location }: BlogPostTemplateQuery) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { mdx: post, previous, next } = data;

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
    <App>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Masthead>
        <Header location={location} />
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
                    {post.tableOfContents.items.map(({ url, title }) => (
                      <li key={url}>
                        <a href={url} className={activeId === url.slice(1) ? 'active' : undefined}>
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

          <OtherPosts>
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
          </OtherPosts>
        </ContentWrapper>
        <Bio />
      </Main>
    </App>
  );
}
