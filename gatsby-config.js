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
  flags: {
    FAST_REFRESH: true,
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
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
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
              showLineNumbers: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pixels with purpose - a blog by Viral Ganatra',
        short_name: 'Pixels with purpose',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/gatsby-icon.png',
        cache_busting_mode: 'none',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-offline',
      options: {},
    },
  ],
};
