import { Board, Comment } from '@prisma/client';
import { gql } from 'apollo-server-micro';
import React, { ChangeEventHandler, ReactElement, useContext, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Action, State } from './BoardTypes';

type Input = {
  values: State;
  postData?: Board & Childcomments;
  comment?: Comment;
  dispatch: React.Dispatch<Action>;
};
type Childcomments = {
  comments: Comment[];
};

const CREATE_COMMENT = gql`
  mutation (
    $username: String
    $content: String!
    $boardId: Int!
    $commentId: Int
  ) {
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
  postData,
  comment,
  values,
  dispatch,
}: Input): ReactElement {
  const [createComment, { data, loading, error }] =
    useMutation(CREATE_COMMENT);

  const onChange = (e: any) => {
    dispatch({ action: e.target.name, value: e.target.value });
  };
  const onClick = async (e: any) => {
    e.preventDefault();
    if (!values.username || !values.content) return;
    const commentPromise = createComment({
      variables: {
        username: values.username || 'ヒルチャール',
        content: values.content,
        boardId: Number(comment?.boardId) || Number(postData?.id),
        commentId: comment?.id ? Number(comment?.id) : null,
      },
    });
    dispatch({ action: 'submit', value: '' }); //入力文字消去
    const { data } = await commentPromise;
    const newcomment = data.createComment.comment;
    newcomment.id = Number(newcomment.id);
    newcomment.commentId = newcomment.commentId
      ? Number(newcomment.commentId)
      : null;
    if (data.createComment.success) {
    }
  };

  return (
    <form className="flex flex-col w-80 rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
      <label className="mx-auto">
        <p>名前</p>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={values.username}
          className="h-8 w-64 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc"
        />
      </label>
      <label className="mx-auto">
        <p>内容</p>
        <textarea
          name="content"
          onChange={onChange}
          value={values.content}
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
