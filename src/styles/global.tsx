import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import emotionNormalize from 'emotion-normalize';
import bgWebp from '../../content/assets/bg.webp';
import { mediaQuery, sm, md, lg } from './responsive';
import { px2rem } from './utils';
import * as tokensWeb from './design-tokens/design-tokens-web';
import * as tokensMobile from './design-tokens/design-tokens-mobile';
import IconTwitter from '../../content/icons/icon-twitter.svg';
import IconHeart from '../../content/icons/icon-heart.svg';

const globalStyles = (
  <Global
    styles={css`
      ${emotionNormalize};

      :root {
        --font-family: 'Open Sans', sans-serif;
        --font-size: ${tokensMobile.TOKEN_FONT_SIZE_BASE};

        --color-turquoise-500: #12cbc4;
        --color-red-500: #d7383f;
        --color-magenta-800: #e6007a;
        --color-fuschia-800: #9932cc;
        --color-fuschia-200: #b9a7ff;
        --color-blue-900: #24303d;
        --color-blue-800: #334150;
        --color-blue-500: #14b3ff;
        --color-blue-100: #e1e8ed;
        --color-yellow-500: #ffc312;
        --color-yellow-100: #f5deb3;
        --color-orange-800: #c75a1f;
        --color-orange-300: #ff8d58;
        --color-orange-200: #e79265;
        --color-gray-900: #333;
        --color-gray-300: #9294a3;
        --color-gray-600: #808080;
        --color-gray-100: #f2f2f7;
        --color-gray-50: #fff;

        --color-text: var(--color-gray-900);
        --color-text-invert: var(--color-gray-100);
        --color-link: var(--color-orange-800);
        --color-link-hover: var(--color-gray-100);
        --color-gradient-1: var(--color-fuschia-800);
        --color-gradient-2: var(--color-magenta-800);
        --color-link-gradient-1: var(--color-blue-500);
        --color-link-gradient-2: var(--color-turquoise-500);
        --color-content-bg: rgba(255, 255, 255, 0.9);

        --color-twitter: var(--color-blue-500);
        --color-twitter-heart: var(--color-red-500);
        --color-twitter-card-bg: var(--color-gray-50);
        --color-twitter-card-border: var(--color-blue-100);
        --color-twitter-video-bg: var(--color-gray-900);

        --text-size-alpha: ${tokensMobile.TOKEN_FONT_SIZE_ALPHA};
        --text-size-beta: ${tokensMobile.TOKEN_FONT_SIZE_BETA};
        --text-size-gamma: ${tokensMobile.TOKEN_FONT_SIZE_GAMMA};
        --text-size-delta: ${tokensMobile.TOKEN_FONT_SIZE_DELTA};
        --text-size-base: ${tokensMobile.TOKEN_FONT_SIZE_BASE};
        --text-line-height-alpha: ${tokensMobile.TOKEN_LINE_HEIGHT_ALPHA};
        --text-line-height-beta: ${tokensMobile.TOKEN_LINE_HEIGHT_BETA};
        --text-line-height-gamma: ${tokensMobile.TOKEN_LINE_HEIGHT_GAMMA};
        --text-line-height-delta: ${tokensMobile.TOKEN_LINE_HEIGHT_DELTA};
        --text-line-height-epsilon: ${tokensMobile.TOKEN_LINE_HEIGHT_EPSILON};
        --text-line-height-base: ${tokensMobile.TOKEN_LINE_HEIGHT_BASE};

        --spacing-xxxs: ${tokensMobile.TOKEN_SPACING_XXXS};
        --spacing-xxs: ${tokensMobile.TOKEN_SPACING_XXS};
        --spacing-xs: ${tokensMobile.TOKEN_SPACING_XS};
        --spacing-sm: ${tokensMobile.TOKEN_SPACING_SM};
        --spacing-md: ${tokensMobile.TOKEN_SPACING_MD};
        --spacing-lg: ${tokensMobile.TOKEN_SPACING_LG};
        --spacing-xl: ${tokensMobile.TOKEN_SPACING_XL};
        --spacing-xxl: ${tokensMobile.TOKEN_SPACING_XXL};
        --spacing-border-radius: ${tokensMobile.TOKEN_SPACING_XXS};
        --spacing-content: ${tokensMobile.TOKEN_SPACING_SM};

        --transition: all 400ms ease;
        --site-max-width: ${px2rem(1300)};

        ${mediaQuery(sm)} {
          --spacing-content: ${tokensMobile.TOKEN_SPACING_MD};
        }
        ${mediaQuery(md)} {
          --font-size: ${tokensWeb.TOKEN_FONT_SIZE_BASE};

          --text-size-alpha: ${tokensWeb.TOKEN_FONT_SIZE_ALPHA};
          --text-size-beta: ${tokensWeb.TOKEN_FONT_SIZE_BETA};
          --text-size-gamma: ${tokensWeb.TOKEN_FONT_SIZE_GAMMA};
          --text-size-delta: ${tokensWeb.TOKEN_FONT_SIZE_DELTA};
          --text-size-epsilon: ${tokensWeb.TOKEN_FONT_SIZE_EPSILON};
          --text-size-base: ${tokensWeb.TOKEN_FONT_SIZE_GAMMA};
          --text-line-height-alpha: ${tokensWeb.TOKEN_LINE_HEIGHT_ALPHA};
          --text-line-height-beta: ${tokensWeb.TOKEN_LINE_HEIGHT_BETA};
          --text-line-height-gamma: ${tokensWeb.TOKEN_LINE_HEIGHT_GAMMA};
          --text-line-height-delta: ${tokensWeb.TOKEN_LINE_HEIGHT_DELTA};
          --text-line-height-epsilon: ${tokensWeb.TOKEN_LINE_HEIGHT_EPSILON};
          --text-line-height-base: ${tokensWeb.TOKEN_LINE_HEIGHT_BASE};

          --spacing-xxxs: ${tokensWeb.TOKEN_SPACING_XXXS};
          --spacing-xxs: ${tokensWeb.TOKEN_SPACING_XXS};
          --spacing-xs: ${tokensWeb.TOKEN_SPACING_XS};
          --spacing-sm: ${tokensWeb.TOKEN_SPACING_SM};
          --spacing-md: ${tokensWeb.TOKEN_SPACING_MD};
          --spacing-lg: ${tokensWeb.TOKEN_SPACING_LG};
          --spacing-xl: ${tokensWeb.TOKEN_SPACING_XL};
          --spacing-xxl: ${tokensWeb.TOKEN_SPACING_XXL};
          --spacing-content: ${tokensWeb.TOKEN_SPACING_XL};
        }
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      html {
        background-size: contain;
        background: var(--color-orange-800) url(${bgWebp}) fixed 0 0;
        box-sizing: border-box;
        color: var(--color-text);
        font-family: var(--font-family);
        font-size: var(--font-size);
        line-height: var(--text-line-height-base);

        ${mediaQuery(lg)} {
          background-size: auto;
        }

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
        margin: ${px2rem(24)} 0;
        font-weight: bold;
      }
      p {
        font-weight: normal;
      }
      h1 {
        font-size: var(--text-size-alpha);
        line-height: var(--text-line-height-alpha);
        margin-top: 0;
      }
      h2 {
        font-size: var(--text-size-beta);
        line-height: var(--text-line-height-beta);
      }
      h3 {
        font-size: var(--text-size-gamma);
        line-height: var(--text-line-height-gamma);
      }
      h4 {
        font-size: var(--base-font-size);
      }
      a {
        --border-hover: 0 var(--spacing-xxxs), 100% var(--spacing-xxxs);

        background: linear-gradient(to right, var(--color-link), var(--color-link)),
          linear-gradient(to right, var(--color-link-gradient-1), var(--color-link-gradient-2));
        background-size: 100% var(--spacing-xxxs), 0 var(--spacing-xxxs);
        background-position: 100% 100%, 0 100%;
        background-repeat: no-repeat;
        color: var(--color-link);
        padding: 0 2px;
        transition: var(--transition);
        text-decoration: none;

        &:hover:not(:active) {
          background-size: var(--border-hover);
        }
        &:active {
          background-color: var(--color-link);
          border-radius: var(--spacing-border-radius);
          color: var(--color-link-hover);
        }
      }
      blockquote:not(.twitter-card) {
        border-left: 5px solid var(--color-link);
        font-size: var(--text-size-beta);
        line-height: var(--text-line-height-beta);
        margin: var(--spacing-lg) 0;
        padding: var(--spacing-xxs) var(--spacing-xs);
        padding-left: var(--spacing-md);

        ${mediaQuery(md)} {
          margin: var(--spacing-lg) var(--spacing-xl);
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
      svg {
        fill: currentColor;
      }

      .heading-link {
        background: none;
        border-bottom: 1px dotted transparent;
        color: inherit;
        text-decoration: none;
        transition: var(--transition);

        &:hover {
          border-bottom-color: var(--color-turquoise-500);

          svg {
            color: var(--color-turquoise-500);
            opacity: 1;
          }
        }
        &:active {
          background-color: inherit;
          color: inherit;
        }
        svg {
          margin-left: var(--spacing-xs);
          opacity: 0;
          transition: var(--transition);
        }
      }

      .gatsby-code-title {
        align-items: center;
        background-color: var(--color-yellow-500);
        border-radius: var(--spacing-border-radius) var(--spacing-border-radius) 0 0;
        display: flex;
        font-size: var(--text-size-epsilon);
        line-height: var(--text-line-height-epsilon);
        margin-top: var(--spacing-md);
        padding: var(--spacing-xs);

        svg {
          margin-right: var(--spacing-xs);
        }
        & + .gatsby-highlight {
          border-radius: 0 0 var(--spacing-border-radius) var(--spacing-border-radius);
          margin-top: 0;
        }
      }
      .gatsby-highlight {
        background-color: var(--color-blue-800);
        border-radius: var(--spacing-border-radius);
        margin: var(--spacing-md) 0;
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
        code[class*='language-'],
        pre[class*='language-'] {
          color: var(--color-gray-100);
        }
        .token.selector,
        .token.important,
        .token.atrule,
        .token.keyword,
        .token.builtin {
          color: var(--color-yellow-500);
        }
        .token.operator,
        .token.entity,
        .token.url {
          color: var(--color-orange-300);
        }
        .token.punctuation {
          color: var(--color-gray-300);
        }
        .token.boolean,
        .token.number,
        .token.function {
          color: var(--color-turquoise-500);
        }
        .token.string,
        .token.char,
        .token.attr-value,
        .token.regex,
        .token.variable {
          color: var(--color-fuschia-200);
        }
      }
      .gatsby-highlight-code-line {
        background-color: var(--color-blue-900);
        border-left: 0.25rem solid var(--color-yellow-500);
        display: block;
        margin: 0 -1rem;
        padding-left: 0.75rem;
        padding-right: 1rem;
      }
      &:not(pre) > code[class*='language-'] {
        background: linear-gradient(90deg, var(--color-gradient-1), var(--color-gradient-2));
        color: white;
      }

      .twitter-card {
        --spacing: var(--spacing-sm);
        --border-radius: 8px;

        background-color: var(--color-twitter-card-bg);
        border-radius: var(--border-radius);
        border: 1px solid var(--color-twitter-card-border);
        margin: var(--spacing-md) 0;
        max-width: 550px;
        padding: var(--spacing);

        a {
          background: none;
          color: inherit;
          padding: 0;
        }
      }
      .twitter-card-header {
        display: grid;
        grid-template-columns: max-content auto max-content;
      }
      .twitter-card-avatar {
        position: relative;

        &:before {
          border-radius: 50%;
          content: '';
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          transition: all 200ms ease;
          width: 100%;
          z-index: 2;
        }

        &:hover:before {
          background: rgba(0, 0, 0, 0.2);
        }
      }
      .twitter-card-profile-image {
        border-radius: 50%;
        display: block;
        position: relative;
      }
      .twitter-card-author {
        align-self: center;
        display: block;
        font-size: var(--text-size-delta);
        line-height: var(--text-line-height-delta);
        margin: 0 var(--spacing-xs);

        &:hover .twitter-card-handle {
          text-decoration: underline;
        }
      }
      .twitter-card-name,
      .twitter-card-handle {
        display: block;
      }
      .twitter-card-logo {
        align-self: flex-start;
        display: inherit;
      }
      .twitter-card-footer {
        align-items: center;
        border-top: 1px solid var(--color-twitter-card-border);
        display: flex;
        font-size: var(--text-size-delta);
        line-height: var(--text-line-height-delta);
        margin-top: var(--spacing);
        padding-top: var(--spacing);

        a:hover {
          color: var(--color-twitter);
        }
      }
      .twitter-card-likes {
        align-items: center;
        display: flex;
        margin-right: var(--spacing-sm);

        svg {
          margin-right: var(--spacing-xxs);
        }
      }
      .twitter-card-icon-brand,
      .twitter-card-icon-like {
        background-color: var(--color-twitter);
        background-size: contain;
        display: inline-block;
        height: 1.25em;
        -webkit-mask-image: url(${IconTwitter});
        mask-image: url(${IconTwitter});
        width: 1.25em;
      }
      .twitter-card-icon-like {
        background-color: var(--color-twitter-heart);
        margin-right: 2px;
        -webkit-mask-image: url(${IconHeart});
        mask-image: url(${IconHeart});
      }
      .twitter-card-video-container {
        background: var(--color-twitter-video-bg);
        border-radius: var(--border-radius);
        display: flex;
        justify-content: center;
      }
      .twitter-card-video {
        max-width: 100%;
      }
      .twitter-card-photo {
        border-radius: var(--border-radius);
        display: block;
        height: auto;
        max-width: 100%;
        object-fit: contain;
      }
    `}
  />
);

export const Main = styled.main`
  background-color: var(--color-content-bg);
  flex-grow: 1;
  padding-top: var(--spacing-content);
  position: relative;

  // Using the clip path on the main element causes weird lag/tearing in Chrome
  &:before {
    ${mediaQuery(sm)} {
      --notch: 3rem;

      background-color: var(--color-content-bg);
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
      content: '';
      height: var(--notch);
      left: 0;
      position: absolute;
      top: calc(var(--notch) * -1);
      width: 100%;
    }
    ${mediaQuery(md)} {
      --notch: 5rem;
    }
    ${mediaQuery(lg)} {
      --notch: 8rem;
    }
  }
`;

export const contentWrapper = css`
  margin: 0 auto;
  max-width: var(--site-max-width);
  padding: 0 var(--spacing-content);
`;

export default globalStyles;
