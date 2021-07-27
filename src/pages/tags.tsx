import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import styled from '@emotion/styled';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import { contentWrapper, Main } from '../styles/global';

type TagsPageProps = PageProps & {
  data: {
    allMdx: {
      group: {
        tag: string;
        count: number;
      }[];
    };
  };
};

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        tag: fieldValue
        count: totalCount
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

const TagList = styled.ol`
  columns: 20rem;
  column-gap: var(--spacing-lg);
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TagLink = styled(Link)`
  color: var(--color-text);
  display: inline-flex;
  font-size: var(--text-size-gamma);
  line-height: var(--text-line-height-gamma);
  margin: var(--spacing-xxs) var(--spacing-xxs) var(--spacing-xxs) 0;

  &:active {
    color: var(--color-text-invert);
  }
`;

const TagCount = styled.span`
  color: var(--color-link);
`;

export default function TagsPage({ data, location }: TagsPageProps) {
  const tagsByCount = data.allMdx.group.sort((a, b) => b.count - a.count);

  return (
    <App>
      <SEO title="All Tags" />

      <Masthead>
        <Header location={location} />
      </Masthead>

      <Main>
        <Content>
          <h1>Search by tag</h1>

          <TagList>
            {tagsByCount.map(({ tag, count }) => {
              const postCount = count === 1 ? 'post' : 'posts';

              return (
                <li key={tag}>
                  <TagLink to={`/tags/${tag}/`}>{tag}</TagLink>
                  <TagCount>
                    {count} {postCount}
                  </TagCount>
                </li>
              );
            })}
          </TagList>
        </Content>
      </Main>
    </App>
  );
}
