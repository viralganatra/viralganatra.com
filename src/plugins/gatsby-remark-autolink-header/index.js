const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

const ICON_POSITION_BEFORE = 'before';
const ICON_POSITION_AFTER = 'after';

function insertIf(condition, ...elements) {
  return condition ? elements : [];
}

function slugify(...args) {
  const value = args.join(' ');

  return value
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
}

const defaultIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 162.656 162.656" aria-hidden="true"><path d="M151.764,10.894c-14.522-14.522-38.152-14.525-52.676-0.008l0.003,0.003L76.112,33.872l10.607,10.605l22.983-22.988l-0.002-0.002c8.678-8.663,22.785-8.658,31.457,0.014c8.673,8.672,8.672,22.786,0,31.461l-34.486,34.484c-4.201,4.202-9.787,6.516-15.729,6.516c-5.942,0-11.529-2.314-15.73-6.516L64.605,98.052c7.035,7.035,16.389,10.91,26.338,10.91c9.949,0,19.303-3.875,26.335-10.91l34.487-34.484C166.284,49.043,166.284,25.413,151.764,10.894z"/><path d="M52.96,141.162L52.96,141.162c-8.675,8.67-22.788,8.668-31.461-0.005c-8.673-8.675-8.673-22.791-0.001-31.465L55.98,75.21c8.675-8.674,22.789-8.674,31.462,0L98.05,64.604c-14.524-14.523-38.154-14.524-52.676,0L10.89,99.086c-14.519,14.523-14.519,38.154,0.001,52.678c7.263,7.262,16.801,10.893,26.341,10.892c9.536,0,19.074-3.629,26.333-10.887l0.002-0.001l22.984-22.99l-10.608-10.606L52.96,141.162z"/></svg>`;

module.exports = (
  { markdownAST },
  { icon = defaultIcon, className = 'heading-link', iconPosition = ICON_POSITION_AFTER } = {},
) => {
  visit(markdownAST, 'heading', (node) => {
    // Skip h1
    if (node.depth === 1) {
      return;
    }

    const text = toString(node);
    const slug = slugify(text);
    const iconContent = { type: 'raw', value: icon };
    const textContent = { type: 'text', value: text };

    node.data = node.data ?? {};
    node.data.hProperties = node.data.hProperties ?? {};

    node.data.id = slug;
    node.data.hProperties.id = slug;
    node.children = [
      {
        type: 'link',
        url: `#${slug}`,
        // https://github.com/syntax-tree/mdast-util-to-hast#note
        data: {
          hProperties: {
            class: className,
          },
          hChildren: [
            ...insertIf(iconPosition === ICON_POSITION_BEFORE, iconContent),
            textContent,
            ...insertIf(iconPosition === ICON_POSITION_AFTER, iconContent),
          ],
        },
      },
    ];
  });

  return markdownAST;
};
