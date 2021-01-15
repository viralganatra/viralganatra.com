import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`;

export default function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Passionate web developer who loves JavaScript!" />

      {posts.map(({ frontmatter, fields, excerpt }) => {
        const title = frontmatter.title || fields.slug;
        return (
          <article key={fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape(),
          fields: PropTypes.shape(),
          excerpt: PropTypes.shape(),
        }),
      ),
    }),
  }).isRequired,
  location: PropTypes.shape().isRequired,
};
