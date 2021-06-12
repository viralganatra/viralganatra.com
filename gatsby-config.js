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
    siteUrl: 'https://www.viralganatra.com',
    social: {
      twitter: 'viralganatra16',
      github: 'https://github.com/viralganatra',
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
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icon-path*'],
        },
      },
    },
  ],
};
