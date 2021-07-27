import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from '@emotion/styled';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import Tags from '../components/tags';
import PostExcerpt from '../components/post-excerpt';
import { contentWrapper, Main } from '../styles/global';
import { mediaQuery, sm, md, lg } from '../styles/responsive';

type HomePageProps = PageProps & {
  data: {
    allMdx: {
      group: {
        tag: string;
        count: number;
      }[];
      nodes: {
        excerpt: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          date: string;
          isoDate: string;
          title: string;
        };
      }[];
    };
  };
};

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        count: totalCount
      }
      nodes {
        excerpt(pruneLength: 280)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          isoDate: date(formatString: "YYYY-MM-DD")
          title
        }
      }
    }
  }
`;

const Masthead = styled.div`
  padding: var(--spacing-sm);
  height: 100vh;
  place-content: center;
  display: flex;
  flex-direction: column;

  ${mediaQuery(sm)} {
    padding: var(--spacing-lg);
  }

  ${mediaQuery(lg)} {
    padding: 100px;
  }
`;

const LatestPostTagsWrapper = styled.div`
  ${contentWrapper};
  display: grid;
  grid-gap: var(--spacing-sm) 0;

  ${mediaQuery(md)} {
    grid-template-columns: repeat(12, 1fr);
    grid-gap: var(--spacing-lg);
  }
`;

const LatestPost = styled.div`
  background: var(--color-yellow-100);
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-xs);
  position: relative;

  article p:last-child {
    margin-bottom: 0;
  }

  ${mediaQuery(sm)} {
    h3 {
      font-size: var(--text-size-alpha);
      line-height: var(--text-line-height-alpha);
    }
  }
  ${mediaQuery(md)} {
    background: none;
    border: var(--spacing-xxs) solid var(--color-link);
    box-shadow: var(--spacing-xs) var(--spacing-xs) 0 var(--color-link);
    grid-column: 4 / -1;

    p {
      font-size: var(--text-size-gamma);
      line-height: var(--text-line-height-gamma);
    }
    article {
      padding: var(--spacing-md);
    }
  }
`;

const LatestText = styled.span`
  background-color: var(--color-link);
  color: var(--color-text-invert);
  display: none;
  font-size: var(--text-size-beta);
  left: 0;
  line-height: var(--text-line-height-beta);
  padding: var(--spacing-xxs) var(--spacing-sm);
  position: absolute;
  top: 0;

  ${mediaQuery(md)} {
    display: inline-block;

    + article {
      margin-top: var(--spacing-lg);
    }
  }
`;

const TagsWrapper = styled.div`
  grid-column: 1 / 4;
`;

const Posts = styled.div`
  ${contentWrapper};
  display: grid;
  grid-gap: var(--spacing-sm);

  ${mediaQuery(sm)} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md);
  }
  ${mediaQuery(md)} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-lg);
    padding: var(--spacing-xxl) var(--spacing-xxl) 0 var(--spacing-xxl);
  }
`;

export default function HomePage({ data, location }: HomePageProps) {
  const { nodes, group: tags } = data.allMdx;
  const [firstPost, ...otherPosts] = nodes;
  const tagsByCount = tags.sort((a, b) => b.count - a.count).map(({ tag }) => tag);

  return (
    <App>
      <SEO title="Passionate web developer who loves JavaScript!" />

      <Masthead>
        <Header location={location} />
      </Masthead>

      <Main>
        <LatestPostTagsWrapper>
          <TagsWrapper>
            <h4>Search by tag...</h4>
            <Tags tags={tagsByCount} canNavigateToAllTags />
          </TagsWrapper>

          <LatestPost>
            <LatestText>Latest</LatestText>
            <PostExcerpt
              frontmatter={firstPost.frontmatter}
              fields={firstPost.fields}
              excerpt={firstPost.excerpt}
            />
          </LatestPost>
        </LatestPostTagsWrapper>

        <Posts>
          {otherPosts.map(({ frontmatter, fields, excerpt }) => (
            <PostExcerpt
              key={fields.slug}
              frontmatter={frontmatter}
              fields={fields}
              excerpt={excerpt}
            />
          ))}
        </Posts>
      </Main>
    </App>
  );
}
