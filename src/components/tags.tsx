import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

type TagsProps = {
  tags?: string[];
  canNavigateToAllTags?: boolean;
  className?: string;
};

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: var(--spacing-md) 0;
  padding: 0;

  li {
    margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
  }
`;

const Tag = styled(Link)`
  background-color: var(--color-link);
  color: var(--color-link-hover);
  display: block;
  padding: 0 var(--spacing-xxs);

  &:hover:not(:active) {
    background-color: var(--color-text);
  }
`;

export default function Tags({ tags = [], canNavigateToAllTags = false, className }: TagsProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag to={`/tags/${tag}/`}>{tag}</Tag>
        </li>
      ))}
      {canNavigateToAllTags ? (
        <li>
          <Link to="/tags/">All tags</Link>
        </li>
      ) : null}
    </TagList>
  );
}
