import React, { ReactElement, useState } from 'react';
import CommentSubmit from './CommentSubmit';

type Comm = {
  id: number;
  content: string;
  commentId: number;
  username: string;
  boardId: number;
};
type State = {
  username: string;
  content: string;
};
export default function CommentComp({
  comment,
  refetch,
}: {
  comment: Comm;
  refetch: any;
}): ReactElement {
  const [submit, setSubmit] = useState(false);
  const [body, setBody] = useState({ username: '', content: '' } as State);

  return (
    <div>
      <div className="flex justify-between">
        <span>
          {comment.id} : {comment.username}
        </span>
        <button
          onClick={() => setSubmit((prev) => !prev)}
          className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mr-2"
        >
          {submit ? '閉じる' : '返信する'}
        </button>
      </div>
      <div className="m-2">{comment.content}</div>
      {submit && (
        <CommentSubmit
          boardId={comment.boardId}
          commentId={comment.id}
          setBody={setBody}
          body={body}
          refetch={refetch}
        />
      )}
    </div>
  );
}
