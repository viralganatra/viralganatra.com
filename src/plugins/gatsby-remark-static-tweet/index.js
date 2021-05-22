const visit = require('unist-util-visit');
const parse5 = require('parse5');
const fromParse5 = require('hast-util-from-parse5');
const transformers = require('./transformers');

function htmlToHast(string) {
  return fromParse5(parse5.parseFragment(string)).children[0];
}

module.exports = async ({ cache, markdownAST }, pluginOptions = {}) => {
  if (!pluginOptions.apiToken) {
    throw new Error(
      'The Twitter API token is missing, please ensure this has been added to the plugin options.',
    );
  }

  const transformations = [];

  visit(markdownAST, 'paragraph', (paragraphNode) => {
    const [node] = paragraphNode.children;
    const { url } = node;

    const isValidLink =
      node.type === 'link' &&
      node.title === null &&
      node.children.length === 1 &&
      node.children[0].value === url;

    if (!isValidLink) {
      return;
    }

    transformers
      .filter(({ shouldTransform }) => shouldTransform(url))
      .forEach(({ getHTML }) => {
        transformations.push(async () => {
          try {
            let html = await cache.get(url);

            if (!html) {
              html = await getHTML(url, pluginOptions);
              await cache.set(url, html);
            }

            const htmlElement = htmlToHast(html.trim());

            // eslint-disable-next-line no-param-reassign
            paragraphNode.data = {
              hName: htmlElement.tagName,
              hProperties: htmlElement.properties,
              hChildren: htmlElement.children,
            };
          } catch (err) {
            console.error(err);

            throw err;
          }
        });
      });
  });

  await Promise.all(transformations.map((t) => t()));

  return markdownAST;
};
