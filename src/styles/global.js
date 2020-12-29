import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import bgLegacy from '../../content/assets/bg.jpg';

const globalStyles = (
  <Global
    styles={css`
      ${emotionNormalize};
      :root {
        --base-font-family: 'Open Sans', sans-serif;
        --base-font-size: 1rem;

        --text-color: #3a3c3e;
        --text-color-highlight: #fff;
        --bg: #e79367;

        --link-color: #fff;
        --link-bg: hotpink;
        --link-bg-hover: #243aab;
        --content-text-color: #111;
        --content-bg: rgba(255, 255, 255, 0.9);

        --code-bg: #272727;
        --code-highlight-line-bg: #636363;
        --code-highlight-line-notch: hotpink;

        --site-max-width: 75em;
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
        line-height: 1.5;
      }
      body {
        margin: 0;
      }
      h1,
      h2,
      h3,
      h4,
      p {
        margin: 1rem 0;
      }
      h1,
      h2,
      h3,
      h4 {
        font-weight: bold;
      }
      h1 {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.6rem;
      }
      h3 {
        font-size: 1.3rem;
      }
      h4 {
        font-size: var(--base-font-size);
      }
      a {
        border-bottom: 2px solid var(--link-bg-hover);
        background-color: var(--link-bg);
        color: var(--link-color);
        display: inline-flex;
        padding: 0 4px;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--link-bg-hover);
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
      }
      .gatsby-highlight-code-line {
        background-color: var(--code-highlight-line-bg);
        border-left: 5px solid var(--code-highlight-line-notch);
        display: block;
        margin: 0 -1rem;
        padding-left: 0.75rem;
        padding-right: 1rem;
      }
      .gatsby-highlight pre[class*='language-'] {
        background-color: transparent;
        margin: 0;
        min-width: 100%;
        overflow: hidden;
        padding: 0;
      }

      .gatsby-highlight pre[class*='language-'].line-numbers {
        padding-left: 2.8rem;
      }
    `}
  />
);

export default globalStyles;
