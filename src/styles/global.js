import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import bgWebp from '../../content/assets/bg.webp';
import { mediaQuery, sm, md } from './responsive';
import { px2rem } from './utils';
import * as tokens from './design-tokens';

const defaultTransition = 'all 0.3s ease';

const globalStyles = (
  <Global
    styles={css`
      ${emotionNormalize};

      :root {
        --base-font-family: 'Open Sans', sans-serif;
        --base-font-size: ${tokens.TOKEN_FONT_SIZE_BASE};

        --text-color: #3a3c3e;
        --text-color-highlight: #fff;
        --bg: #e79367;

        --gradient-color-primary: #ff1493;
        --gradient-color-secondary: #9932cc;

        --link-color: #006fc6;
        --link-color-hover: #fff;
        --content-text-color: #111;
        --content-bg: rgba(255, 255, 255, 0.9);

        --code-bg: #272727;
        --code-highlight-line-bg: #636363;
        --code-highlight-line-notch: hotpink;

        --site-max-width: ${px2rem(1100)};

        --spacing-content: ${tokens.TOKEN_SPACING_SM};

        ${mediaQuery(sm)} {
          --spacing-content: ${tokens.TOKEN_SPACING_MD};
        }
        ${mediaQuery(md)} {
          --spacing-content: ${tokens.TOKEN_SPACING_XL};
        }
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      html {
        background: var(--bg) url(${bgWebp}) fixed 0 0;
        box-sizing: border-box;
        color: var(--text-color);
        font-family: var(--base-font-family);
        font-size: var(--base-font-size);
        line-height: ${tokens.TOKEN_LINE_HEIGHT_BASE};

        /* one day...
        background-image: image-set(
          url('/images/bg.avif') 1x,
          url('/images/bg.webp') 1x,
        ); */
      }
      body {
        margin: 0;
      }
      h1,
      h2,
      h3,
      h4,
      p {
        margin: ${px2rem(16)} 0;
        font-weight: bold;
      }
      p {
        font-weight: normal;
      }
      h1 {
        font-size: ${tokens.TOKEN_FONT_SIZE_ALPHA};
        line-height: ${tokens.TOKEN_LINE_HEIGHT_ALPHA};
      }
      h2 {
        font-size: ${tokens.TOKEN_FONT_SIZE_BETA};
        line-height: ${tokens.TOKEN_LINE_HEIGHT_BETA};
      }
      h3 {
        font-size: ${tokens.TOKEN_FONT_SIZE_GAMMA};
        line-height: ${tokens.TOKEN_LINE_HEIGHT_GAMMA};
      }
      h4 {
        font-size: var(--base-font-size);
      }
      a {
        background: linear-gradient(to right, var(--link-color), var(--link-color)),
          linear-gradient(to right, var(--gradient-color-primary), var(--gradient-color-secondary));
        background-size: 100% ${tokens.TOKEN_SPACING_XXXS}, 0 ${tokens.TOKEN_SPACING_XXXS};
        background-position: 100% 100%, 0 100%;
        background-repeat: no-repeat;
        color: var(--link-color);
        transition: ${defaultTransition};
        text-decoration: none;

        &:hover {
          background-size: 0 ${tokens.TOKEN_SPACING_XXXS}, 100% ${tokens.TOKEN_SPACING_XXXS};
        }
        &:active {
          background-color: var(--link-color);
          color: var(--link-color-hover);
        }
      }
      blockquote {
        border-left: 5px solid var(--link-color);
        font-size: ${tokens.TOKEN_FONT_SIZE_BETA};
        line-height: ${tokens.TOKEN_LINE_HEIGHT_BETA};
        margin: ${tokens.TOKEN_SPACING_LG} 0;
        padding: ${tokens.TOKEN_SPACING_XXS} ${tokens.TOKEN_SPACING_XS};
        padding-left: ${tokens.TOKEN_SPACING_MD};

        ${mediaQuery(md)} {
          margin: ${tokens.TOKEN_SPACING_LG} ${tokens.TOKEN_SPACING_XL};
        }
        p {
          quotes: '“' '”' '‘' '’';
          text-indent: -0.45em;

          @supports (hanging-punctuation: first) {
            text-indent: 0;
            hanging-punctuation: first;
          }
          &:before,
          &:after {
            content: open-quote;
            font-family: serif;
            font-size: 120%;
          }
          &:after {
            content: close-quote;
          }
          &:first-of-type {
            margin-top: 0;
          }
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      .heading-link {
        background: none;
        border-bottom: 1px dotted transparent;
        color: inherit;
        text-decoration: none;
        transition: ${defaultTransition};

        &:hover {
          border-bottom-color: grey;

          svg {
            opacity: 1;
          }
        }
        &:active {
          background-color: inherit;
          color: inherit;
        }
        svg {
          margin-left: ${tokens.TOKEN_SPACING_XS};
          opacity: 0;
          transition: ${defaultTransition};
        }
      }

      .gatsby-highlight {
        background-color: var(--code-bg);
        border-radius: 0.3rem;
        margin: 0.5rem 0;
        padding: 1rem;
        overflow: auto;

        pre[class*='language-'] {
          background-color: transparent;
          float: left;
          margin: 0;
          min-width: 100%;
          padding: 0;
          overflow: initial;
        }
      }
      .gatsby-highlight-code-line {
        background-color: var(--code-highlight-line-bg);
        border-left: 0.25rem solid var(--code-highlight-line-notch);
        display: block;
        margin: 0 -1rem;
        padding-left: 0.75rem;
        padding-right: 1rem;
      }
      &:not(pre) > code[class*='language-'] {
        background: linear-gradient(
          90deg,
          var(--gradient-color-primary),
          var(--gradient-color-secondary)
        );
        color: white;
      }
    `}
  />
);

export default globalStyles;
