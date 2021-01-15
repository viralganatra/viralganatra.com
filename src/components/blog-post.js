import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import SEO from './seo';
import * as tokens from '../styles/design-tokens';

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
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

const Article = styled.article`
  h2 {
    margin-top: ${tokens.TOKEN_SPACING_MD};
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

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

export default function BlogPostTemplate({ data, location }) {
  const { mdx: post, previous, next, site } = data;
  const siteTitle = site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article itemScope itemType="http://schema.org/Article">
        <header>
          <Title itemProp="headline">{post.frontmatter.title}</Title>
          <ArticleMeta>
            <time dateTime={post.frontmatter.isoDate}>{post.frontmatter.date}</time>
            <Separator>·</Separator>
            {post.timeToRead} min read
          </ArticleMeta>
        </header>
        <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
        <hr />
      </Article>

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
    }).isRequired,
    previous: PropTypes.shape(),
    next: PropTypes.shape(),
  }).isRequired,
  location: PropTypes.shape().isRequired,
};
