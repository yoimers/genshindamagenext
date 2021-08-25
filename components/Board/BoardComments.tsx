import { Board, Comment } from '@prisma/client';
import React, { ReactElement, useReducer, useState } from 'react';
import { Action, State } from './BoardTypes';
import CommentComp from './CommentComp';
import CommentSubmit from './CommentSubmit';

type Input = {
  postData: Board & Childcomments;
};
type Childcomments = {
  comments: Comment[];
};
export const commentreducer = (prev: State, action: Action): State => {
  switch (action.action) {
    case 'username':
    case 'content':
      return { ...prev, [action.action]: action.value };
    case 'submit':
      if (!prev.username || !prev.content) {
        return prev;
      } else {
        return { username: action.value, content: action.value };
      }
  }
};

export default function BoardComments({ postData }: Input): ReactElement {
  const [values, dispatch] = useReducer(commentreducer, { username: '', content: '' } as State);
  const comments = postData.comments;

  function Childcomment({ comment }: { comment: Comment }): ReactElement {
    const childcomment = comments.filter((filcomment) => filcomment.commentId === comment.id);
    return (
      <li className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
        <CommentComp comment={comment} key={comment.id} />
        <ul>
          {childcomment &&
            childcomment.map((child) => <Childcomment key={child.id} comment={child} />)}
        </ul>
      </li>
    );
  }

  return (
    <div>
      {comments.map((comment: Comment) => {
        if (comment.commentId) return;
        return (
          <ul className="mt-4" key={comment.id}>
            <Childcomment comment={comment} />
          </ul>
        );
      })}
      <CommentSubmit postData={postData} values={values} dispatch={dispatch} />
    </div>
  );
}
