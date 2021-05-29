const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('./src/templates/blog.js');
  const tagTemplate = path.resolve('./src/templates/tags.js');

  const result = await graphql(`
    {
      blogPosts: allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('There was an error loading your blog posts', result.errors);
    return;
  }

  const { blogPosts, tagsGroup } = result.data;
  const posts = blogPosts.nodes;
  const tags = tagsGroup.group;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${tag.fieldValue}`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
