import React, { ReactElement, useState } from 'react';
import CommentSubmit from './CommentSubmit';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

type Comm = {
  id: number;
  content: string;
  commentId: number;
  username: string;
  boardId: number;
  createdAt: string;
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
  let DAY;
  if (comment) {
    const d = new Date(Number(comment?.createdAt));
    DAY = dayjs(d);
  }
  return (
    <div>
      <div className="flex justify-between">
        <span>
          {comment?.id} : {comment?.username}
        </span>
        <span>
          <span className="mr-5 text-base">{DAY?.format('YYYY-MM-DD-ddd HH:mm:ss')}</span>
          <button
            onClick={() => setSubmit((prev) => !prev)}
            className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mr-2"
          >
            {submit ? '閉じる' : '返信する'}
          </button>
        </span>
      </div>
      <div className="m-2 whitespace-pre-wrap">{comment.content}</div>
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
