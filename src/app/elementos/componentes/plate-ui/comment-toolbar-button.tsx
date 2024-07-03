'use client';

import React from 'react';

import { useCommentAddButton } from '@udecode/plate-comments';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton tooltip="Comment (ctrl+⇧+M)" {...props}>
      <Icons.commentAdd />
    </ToolbarButton>
  );
}
