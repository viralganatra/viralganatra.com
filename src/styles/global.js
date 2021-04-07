import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import bgLegacy from '../../content/assets/bg.jpg';
import { mediaQuery, sm, md } from './responsive';
import { px2rem } from './utils';
import * as tokens from './design-tokens';

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

        --link-color: #006fc6;
        --link-color-hover: #fff;
        --content-text-color: #111;
        --content-bg: rgba(255, 255, 255, 0.9);

        --code-bg: #272727;
        --code-highlight-line-bg: #636363;
        --code-highlight-line-notch: hotpink;

        --site-max-width: ${px2rem(1200)};

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
        background: var(--bg) url(${bgLegacy}) fixed 0 0;
        box-sizing: border-box;
        color: var(--text-color);
        font-family: var(--base-font-family);
        font-size: var(--base-font-size);
        line-height: ${tokens.TOKEN_LINE_HEIGHT_BASE};
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
        border-bottom: 2px solid var(--link-color);
        color: var(--link-color);
        display: inline-flex;
        padding: 0 4px;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--link-color);
          color: var(--link-color-hover);
        }
        &:active {
          transform: translateY(2px);
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

      h2,
      h3,
      h4 {
        .anchor {
          background: none;
          border: none;
          color: inherit;
          display: none;
          margin-left: calc(-${tokens.TOKEN_SPACING_MD} - 2px);
          margin-right: 2px;
          opacity: 0;
          padding: 0;
          transition: opacity 0.1 ease;

          ${mediaQuery(md)} {
            display: inline;
          }
          &:hover {
            color: var(--link-color);
          }
          svg {
            fill: currentColor;
          }
        }
        &:hover .anchor {
          background: inherit;
          opacity: 1;
        }
      }
    `}
  />
);

export default globalStyles;
