import { gql } from 'apollo-server-micro';
import React, { ChangeEventHandler, ReactElement, useState } from 'react';
import { useMutation } from 'react-apollo';

type Input = {
  boardId: number;
  commentId: number | null;
  body: State;
  setBody: React.Dispatch<React.SetStateAction<State>>;
  refetch: any;
};
type State = {
  username: string;
  content: string;
};

const CREATE_COMMENT = gql`
  mutation ($username: String, $content: String!, $boardId: Int!, $commentId: Int) {
    createComment(
      username: $username
      content: $content
      boardId: $boardId
      commentId: $commentId
    ) {
      success
      comment {
        id
        username
        content
        boardId
        commentId
      }
    }
  }
`;
export default function CommentSubmit({
  boardId,
  commentId = null,
  body,
  setBody,
  refetch,
}: Input): ReactElement {
  const [createComment, { data, loading, error }] = useMutation(CREATE_COMMENT);
  const onChange = (e: any) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onClick = async (e: any) => {
    e.preventDefault();
    setBody({ username: '', content: '' });
    if (!body.content) return;
    await createComment({
      variables: {
        username: body.username || 'ヒルチャール',
        content: body.content,
        boardId: Number(boardId),
        commentId: commentId ? Number(commentId) : null,
      },
    });
    refetch();
  };

  return (
    <form className="flex flex-col w-80 rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
      <label className="mx-auto">
        <p>名前</p>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={body?.username}
          className="h-8 w-64 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc"
        />
      </label>
      <label className="mx-auto">
        <p>内容</p>
        <textarea
          name="content"
          onChange={onChange}
          value={body?.content}
          className="h-32 w-64 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc"
        />
      </label>
      <input
        type="submit"
        onClick={onClick}
        className="h-12 w-20 text-xl rounded-lg bg-gray-600 shadow-xl text-blue-100 mt-4 focus:ring-1 ring-blue-100 ring-offset-2 ring-offset-bgc ml-6 mb-2"
      />
    </form>
  );
}
