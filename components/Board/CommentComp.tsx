import { Comment } from '@prisma/client';
import React, { ReactElement, useReducer, useState } from 'react';
import { Action, State } from './BoardTypes';
import CommentSubmit from './CommentSubmit';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Input = {
  comment: Comment;
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

export default function CommentComp({ comment }: Input): ReactElement {
  const [submit, setSubmit] = useState(false);
  const [values, dispatch] = useReducer(commentreducer, { username: '', content: '' } as State);
  const DAY = dayjs(comment.createdAt);
  return (
    <div>
      <div className="flex justify-between">
        <span>
          {comment?.id} : {comment?.username}
        </span>
        <span>
          <span className="mr-5 text-base">
            {DAY.format('YYYY-MM-DD-ddd HH:mm:ss')}
          </span>
          <button
            onClick={() => setSubmit((prev) => !prev)}
            className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mr-2"
          >
            {submit ? '閉じる' : '返信する'}
          </button>
        </span>
      </div>
      <div className="m-2 whitespace-pre-wrap">
        {comment?.content}
      </div>
      {/* {submit && <CommentSubmit comment={comment} values={values} dispatch={dispatch} />} */}
    </div>
  );
}
