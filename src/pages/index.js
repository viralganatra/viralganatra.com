import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import App from '../components/app';
import SEO from '../components/seo';
import Header from '../components/header';
import { HEADER_SIZE_LARGE } from '../constants/header';
import { contentWrapper, Main } from '../styles/global';
import { mediaQuery, sm, md, lg } from '../styles/responsive';

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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

const PostTitle = styled.h3`
  margin-top: 0;
  font-size: var(--text-size-beta);
  line-height: var(--text-line-height-beta);

  a {
    color: var(--color-text);

    &:active {
      color: var(--color-text-invert);
    }
  }
`;

const PostExcerpt = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const LatestPost = styled.div`
  background: var(--color-bg-accent);
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-xs);
  position: relative;

  article p:last-child {
    margin-bottom: 0;
  }

  ${mediaQuery(sm)} {
    ${PostTitle} {
      font-size: var(--text-size-alpha);
      line-height: var(--text-line-height-alpha);
    }
  }
  ${mediaQuery(md)} {
    background: none;
    border: var(--spacing-xxs) solid var(--color-link);
    box-shadow: var(--spacing-xs) var(--spacing-xs) 0 var(--color-link);
    grid-column: 4 / -1;

    ${PostExcerpt} {
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

const Tags = styled.div`
  grid-column: 1 / 4;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
  }
`;

const Tag = styled.a`
  background-color: var(--color-link);
  color: var(--color-link-hover);
  display: block;
  padding: 0 var(--spacing-xxs);

  &:hover:not(:active) {
    background-color: var(--color-text);
  }
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

export default function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const [firstPost, ...otherPosts] = data.allMdx.nodes;

  return (
    <App location={location} title={siteTitle}>
      <SEO title="Passionate web developer who loves JavaScript!" />

      <Masthead>
        <Header size={HEADER_SIZE_LARGE} text="Hi, I'm Viral Ganatra" />
      </Masthead>

      <Main>
        <LatestPostTagsWrapper>
          <Tags>
            <h4>Search by tag...</h4>

            <TagList>
              <li>
                <Tag href="#">test</Tag>
              </li>
              <li>
                <Tag href="#">css grid</Tag>
              </li>
              <li>
                <Tag href="#">js</Tag>
              </li>
              <li>
                <a href="/">All tags</a>
              </li>
            </TagList>
          </Tags>

          <LatestPost>
            <LatestText>Latest</LatestText>
            <article>
              <header>
                <PostTitle>
                  <Link to={firstPost.fields.slug}>{firstPost.frontmatter.title}</Link>
                </PostTitle>
              </header>
              <time dateTime={firstPost.frontmatter.isoDate}>{firstPost.frontmatter.date}</time>
              <PostExcerpt dangerouslySetInnerHTML={{ __html: firstPost.excerpt }} />
            </article>
          </LatestPost>
        </LatestPostTagsWrapper>

        <Posts>
          {otherPosts.map(({ frontmatter, fields, excerpt }) => (
            <article key={fields.slug}>
              <header>
                <PostTitle>
                  <Link to={fields.slug}>{frontmatter.title}</Link>
                </PostTitle>
                <time dateTime={firstPost.frontmatter.isoDate}>{frontmatter.date}</time>
              </header>
              <PostExcerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
            </article>
          ))}
        </Posts>
      </Main>
    </App>
  );
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    allMdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            date: PropTypes.string.isRequired,
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
          excerpt: PropTypes.string.isRequired,
        }),
      ),
    }),
  }).isRequired,
  location: PropTypes.shape().isRequired,
};
