import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

type PostExcerptProps = {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    isoDate: string;
    date: string;
  };
  excerpt: string;
};

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

export default function PostExcerpt({ fields, frontmatter, excerpt }: PostExcerptProps) {
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
