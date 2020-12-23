import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import bg from '../../content/assets/bg.webp';

const globalStyles = (
  <Global
    styles={css`
      ${emotionNormalize};
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      html {
        background: url(${bg}) fixed 0 0;
        box-sizing: border-box;
      }
      a {
        border-bottom: 2px solid #243aab;
        background-color: hotpink;
        color: white;
        padding: 0 4px;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background-color: #243aab;
        }
      }
      body {
        font-family: 'Open Sans', sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }

      .gatsby-highlight-code-line {
        background-color: #636363;
        display: block;
        margin-right: -1em;
        margin-left: -1em;
        padding-right: 1em;
        padding-left: 0.75em;
        border-left: 0.25em solid #f99;
      }

      /**
       * Add back the container background-color, border-radius, padding, margin
       * and overflow that we removed from <pre>.
       */
      .gatsby-highlight {
        background-color: #272727;
        border-radius: 0.3em;
        margin: 0.5em 0;
        padding: 1em;
        overflow: auto;
      }
      /**
       * Remove the default PrismJS theme background-color, border-radius, margin,
       * padding and overflow.
       * 1. Make the element just wide enough to fit its content.
       * 2. Always fill the visible space in .gatsby-highlight.
       * 3. Adjust the position of the line numbers
       */
      .gatsby-highlight pre[class*='language-'] {
        background-color: transparent;
        margin: 0;
        padding: 0;
        overflow: hidden;
        float: left; /* 1 */
        min-width: 100%; /* 2 */
      }

      // Adjust the position of the line numbers
      .gatsby-highlight pre[class*='language-'].line-numbers {
        padding-left: 2.8em;
      }
    `}
  />
);

export default globalStyles;
