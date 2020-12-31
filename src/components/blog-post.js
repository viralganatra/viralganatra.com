import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from './layout';
import SEO from './seo';

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

const Title = styled.h1`
  margin-top: 0;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

export default function BlogPostTemplate({ data, location }) {
  const { markdownRemark: post, previous, next, site } = data;
  const siteTitle = site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <Title itemProp="headline">{post.frontmatter.title}</Title>
          <time dateTime={post.frontmatter.isoDate}>{post.frontmatter.date}</time>
        </header>
        <section itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
      </article>

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
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        isoDate: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
      excerpt: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
    previous: PropTypes.shape(),
    next: PropTypes.shape(),
  }).isRequired,
  location: PropTypes.shape().isRequired,
};
