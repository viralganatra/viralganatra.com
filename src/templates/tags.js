import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import PostExcerpt from '../components/post-excerpt';
import { contentWrapper, Main } from '../styles/global';
import { mediaQuery, sm, md } from '../styles/responsive';

export const pageQuery = graphql`
  query TagsBySlug($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
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

export default function TagsBySlugPage({ data, pageContext }) {
  const siteTitle = data.site.siteMetadata.title;
  const { totalCount, nodes: posts } = data.allMdx;

  return (
    <App title={siteTitle}>
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

TagsBySlugPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
          }).isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
};
