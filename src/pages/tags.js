import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import { contentWrapper, Main } from '../styles/global';

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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

export default function TagsPage({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const tagsByCount = data.allMdx.group.sort((a, b) => b.count - a.count);

  return (
    <App title={siteTitle}>
      <SEO title="All Tags" />

      <Masthead>
        <Header text="Viral Ganatra" />
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

TagsPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          tag: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        }),
      ),
    }).isRequired,
  }).isRequired,
};
