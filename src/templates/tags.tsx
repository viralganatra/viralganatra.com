import React from 'react';
import styled from '@emotion/styled';
import { graphql, PageProps } from 'gatsby';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import PostExcerpt from '../components/post-excerpt';
import { contentWrapper, Main } from '../styles/global';
import { mediaQuery, sm, md } from '../styles/responsive';

type TagsTemplateProps = PageProps & {
  data: {
    allMdx: {
      totalCount: number;
      nodes: {
        id: string;
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          isoDate: string;
        };
        fields: {
          slug: string;
        };
      }[];
    };
  };
  pageContext: {
    tag: string;
  };
};

export const pageQuery = graphql`
  query TagsBySlug($tag: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        id
        excerpt(pruneLength: 280)
        frontmatter {
          title
          date(formatString: "DD MMMM YYYY")
          isoDate: date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;

const Masthead = styled.div`
  padding: var(--spacing-content);
`;

const Content = styled.div`
  ${contentWrapper};
`;

const TotalCount = styled.p`
  border-bottom: 1px solid var(--color-text);
  margin: var(--spacing-lg) 0;
  padding-bottom: var(--spacing-xs);
`;

const Posts = styled.div`
  display: grid;
  grid-gap: var(--spacing-sm);

  ${mediaQuery(sm)} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--spacing-md);
  }
  ${mediaQuery(md)} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-lg);
  }
`;

export default function TagsTemplate({ data, pageContext }: TagsTemplateProps) {
  const { totalCount, nodes: posts } = data.allMdx;

  return (
    <App>
      <SEO title="All Tags" />

      <Masthead>
        <Header text="Viral Ganatra" />
      </Masthead>

      <Main>
        <Content>
          <h1>Tagged &ldquo;{pageContext.tag}&rdquo;</h1>
          <TotalCount>{totalCount} posts</TotalCount>

          <Posts>
            {posts.map(({ frontmatter, fields, excerpt }) => (
              <PostExcerpt
                key={fields.slug}
                frontmatter={frontmatter}
                fields={fields}
                excerpt={excerpt}
              />
            ))}
          </Posts>
        </Content>
      </Main>
    </App>
  );
}
