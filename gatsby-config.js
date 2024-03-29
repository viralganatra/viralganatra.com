require('dotenv-flow').config();

module.exports = {
  siteMetadata: {
    title: 'Viral Ganatra',
    tagline: 'Pixels with purpose',
    author: {
      name: 'Viral Ganatra',
      summary: 'Principal engineer at Third Bridge working on the web, sharing through experience.',
    },
    description: 'A technical blog by Viral Ganatra',
    siteUrl: 'https://viralganatra.com',
    social: {
      twitter: 'viralganatra16',
      github: 'viralganatra',
    },
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: require.resolve('./src/plugins/gatsby-remark-static-tweet'),
            options: {
              apiToken: process.env.TWITTER_BEARER_TOKEN,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              withWebp: true,
              withAvif: true,
              useMozJpeg: true,
            },
          },
          {
            resolve: require.resolve('./src/plugins/gatsby-remark-autolink-header'),
          },
          {
            resolve: require.resolve('./src/plugins/gatsby-remark-prismjs-title'),
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '›',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: null,
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                guid: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                custom_elements: [{ 'content:encoded': node.html }],
              })),
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Pixels with purpose - a blog by Viral Ganatra',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pixels with purpose - a blog by Viral Ganatra',
        short_name: 'Pixels with purpose',
        start_url: '/',
        background_color: '#c75a1f',
        theme_color: '#ffffff',
        display: 'standalone',
        icon: 'content/assets/favicon-512x512.png',
        cache_busting_mode: 'none',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
        `,
        serialize: ({ path }) => {
          const url = path.endsWith('/') ? path : `${path}/`;

          return { url };
        },
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_API_TOKEN],
      },
    },
  ],
};
