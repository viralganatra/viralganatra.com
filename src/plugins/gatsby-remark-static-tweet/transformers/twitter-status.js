const fetch = require('node-fetch');
const fromMarkdown = require('mdast-util-from-markdown');
const toHast = require('mdast-util-to-hast');
const toHtml = require('hast-util-to-html');
const { format } = require('date-fns');
const { API_TWITTER_STATUS, API_TWITTER_INTENT } = require('../constants/api');

exports.shouldTransform = function shouldTransform(url) {
  try {
    const { host, pathname } = new URL(url);

    return ['twitter.com', 'www.twitter.com'].includes(host) && pathname.includes('/status/');
  } catch (err) {
    return false;
  }
};

async function fetchTweet(url, apiToken) {
  const { pathname } = new URL(url);
  const [tweetId] = pathname.split('/').reverse();

  const resp = await fetch(API_TWITTER_STATUS(tweetId), {
    headers: {
      Authorization: apiToken,
    },
  });
  const json = await resp.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors[0]));
  }

  return { ...json, url };
}

function getTweetImage(tweetMedia) {
  const url = tweetMedia.media_url_https;
  const [mimeType, ...urlParts] = url.split('.').reverse();
  const baseUrl = urlParts.reverse().join('.');
  const size = tweetMedia.sizes.small;

  return {
    height: size.h,
    width: size.w,
    url: `${baseUrl}?format=${mimeType}&name=small`,
    type: tweetMedia.type,
  };
}

function getTweetVideo(tweetMedia) {
  const videoVariants = tweetMedia.video_info.variants;
  const [videoWithLowestBitrate] = videoVariants.sort((a, b) => a.bitrate - b.bitrate);
  const [width, height] = videoWithLowestBitrate.url.split('/').reverse()[1].split('x');
  const image = getTweetImage(tweetMedia);

  return {
    width,
    height,
    image,
    type: tweetMedia.type,
    url: videoWithLowestBitrate.url,
    contentType: videoWithLowestBitrate.content_type,
  };
}

function getTweetDetails(tweet) {
  const {
    created_at: createdAt,
    url,
    user,
    full_text: text,
    extended_entities: entities,
    favorite_count: likes,
    retweet_count: retweets,
  } = tweet;
  const [media] = entities?.media ?? [];
  let video = {};
  let photo = {};

  if (media?.type === 'video') {
    video = getTweetVideo(media);
  } else if (media?.type === 'photo') {
    photo = getTweetImage(media);
  }

  let formattedText = text.replace(media?.url, '');
  formattedText = toHtml(toHast(fromMarkdown(formattedText)));

  return {
    createdAt,
    url,
    likes,
    retweets,
    intentUrl: API_TWITTER_INTENT(tweet.id),
    text: formattedText,
    media: {
      ...photo,
      ...video,
    },
    user: {
      name: user.name,
      handle: `@${user.screen_name}`,
      profileImage: user.profile_image_url_https,
    },
  };
}

function tweetTemplate(tweet) {
  const likes = (tweet.likes / 1000).toFixed(1);
  const date = format(new Date(tweet.createdAt), 'h:mm a · MMMM dd, yyyy');
  const isoDate = new Date(tweet.createdAt).toISOString();

  const videoHTML =
    tweet.media?.type === 'video'
      ? `
    <div class="twitter-card-video-container">
      <video class="twitter-card-video" loop controls>
        <source src="${tweet.media.url}" type="${tweet.media.contentType}">
      </video>
    </div>`
      : '';

  const photoHTML =
    tweet.media?.type === 'photo'
      ? `
    <div class="twitter-card-photo-container">
      <img
        src="${tweet.media.url}"
        alt="Tweet by: ${tweet.user.name}"
        class="twitter-card-photo"
        width="${tweet.media.width}"
        height="${tweet.media.height}"
        loading="lazy"
        decoding="async"
      >
    </div>`
      : '';

  return `
    <blockquote class="twitter-card">
      <header class="twitter-card-header">
        <a
          href="https://twitter.com/${tweet.user.handle}"
          class="twitter-card-avatar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="${tweet.user.profileImage}"
            class="twitter-card-profile-image"
            alt="${tweet.user.name}"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          >
        </a>
        <a
          href="https://twitter.com/${tweet.user.handle}"
          class="twitter-card-author"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="twitter-card-name">${tweet.user.name}</span>
          <span class="twitter-card-handle">${tweet.user.handle}</span>
        </a>
        <a
          class="twitter-card-logo"
          href="${tweet.url}"
          target="_blank"
          rel="noopener noreferrer"
          title="View on Twitter"
        >
          <div class="twitter-card-icon-brand" role="img"></div>
        </a>
      </header>
      <div class="twitter-card-content">
        ${tweet.text}
        ${videoHTML}
        ${photoHTML}
      </div>
      <footer class="twitter-card-footer">
        <a
          class="twitter-card-likes"
          href="${tweet.intentUrl}"
          target="_blank"
          rel="noopener noreferrer"
          title="Like"
        >
          <div class="twitter-card-icon-like" role="img"></div>
          <span class="twitter-card-num-likes">
            ${likes}k
          </span>
        </a>
        <a
          href="${tweet.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="twitter-card-date"
        >
          <time dateTime="${isoDate}">${date}</time>
        </a>
      </footer>
    </blockquote>
  `;
}

function getTweetHTML(tweet, template = tweetTemplate) {
  return template(tweet);
}

exports.getHTML = async function getHTML(twitterStatusUrl, options = {}) {
  const data = await fetchTweet(twitterStatusUrl, options.apiToken);
  const tweet = getTweetDetails(data);
  const html = getTweetHTML(tweet, options.template);

  return html;
};
