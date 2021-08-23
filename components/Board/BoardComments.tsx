import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useState } from 'react';
import CommentComp from './CommentComp';
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
export default function BoardComments({
  comments,
  refetch,
}: {
  comments: Comm[];
  refetch: any;
}): ReactElement {
  const [body, setBody] = useState({ username: '', content: '' } as State);
  const { query } = useRouter();
  const board = query.board;
  if (!board || board.length === 0) return <></>;
  function Childcomment({ comment }: { comment: Comm }): ReactElement {
    const childcomment = comments.filter((filcomment) => filcomment.commentId === comment.id);
    return (
      <li className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
        <CommentComp comment={comment} key={comment.id} refetch={refetch} />
        <ul>
          {childcomment.map((child) => (
            <Childcomment key={child.id} comment={child} />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <div>
      {comments.map((comment: Comm) => {
        if (comment.commentId) return;
        return (
          <ul className="mt-4" key={comment.id}>
            <Childcomment comment={comment} />
          </ul>
        );
      })}
      <CommentSubmit
        boardId={Number(board[0])}
        commentId={null}
        body={body}
        setBody={setBody}
        refetch={refetch}
      />
    </div>
  );
}
