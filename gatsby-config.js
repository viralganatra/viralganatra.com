module.exports = {
  siteMetadata: {
    title: 'Viral Ganatra',
    author: {
      name: 'Viral Ganatra',
      summary: 'Passionate engineer working on the web',
    },
    description: 'A technical blog by Viral Ganatra',
    siteUrl: 'https://www.viralganatra.com',
    social: {
      twitter: 'viralganatra16',
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
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '›',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pixels with purpose - a blog by Viral Ganatra',
        short_name: 'Pixels with purpose',
        start_url: '/',
        background_color: '#E79367',
        theme_color: '#ffffff',
        display: 'standalone',
        icon: 'content/assets/favicon-512x512.png',
        cache_busting_mode: 'name',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-offline',
      options: {},
    },
  ],
};
