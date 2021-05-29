import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Title = styled.h3`
  margin-top: 0;
  font-size: var(--text-size-beta);
  line-height: var(--text-line-height-beta);

  a {
    color: var(--color-text);

    &:active {
      color: var(--color-text-invert);
    }
  }
`;

const Excerpt = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export default function PostExcerpt({ fields, frontmatter, excerpt }) {
  return (
    <article>
      <header>
        <Title>
          <Link to={fields.slug}>{frontmatter.title}</Link>
        </Title>
        <time dateTime={frontmatter.isoDate}>{frontmatter.date}</time>
      </header>
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
    </article>
  );
}

PostExcerpt.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isoDate: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  excerpt: PropTypes.string.isRequired,
};
