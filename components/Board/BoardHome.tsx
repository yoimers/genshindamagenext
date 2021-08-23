import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { OperationVariables, useApolloClient, useMutation } from 'react-apollo';

type State = {
  title: string;
  content: string;
};
const CREATE_BOARD = gql`
  mutation ($title: String!, $content: String!) {
    createBoard(title: $title, content: $content) {
      success
      board {
        id
        title
        content
      }
    }
  }
`;
type Input = {
  refetch: (variables?: OperationVariables) => Promise<ApolloQueryResult<any>>;
};
export default function BoardHome({ refetch }: Input) {
  const [body, setBody] = useState({ title: '', content: '' } as State);
  const [createBoard, { data, loading, error }] = useMutation(CREATE_BOARD);
  const onChange = (e: any) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onClick = async (e: any) => {
    e.preventDefault();
    setBody({ title: '', content: '' });
    if (!body.title || !body.content) return;
    await createBoard({
      variables: {
        title: body.title,
        content: body.content,
      },
    });
    refetch();
  };
  return (
    <div className="m-5 ">
      <p className="text-3xl text-blue-100">掲示板作成</p>
      <form onSubmit={onClick} className="flex flex-col">
        <label>
          <p>タイトル</p>
          <input
            type="text"
            onChange={onChange}
            value={body.title}
            name="title"
            className="h-8 w-64 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc pl-2"
          />
        </label>
        <label>
          <p>内容</p>
          <textarea
            onChange={onChange}
            value={body.content}
            name="content"
            className="h-32 w-64 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc pl-2"
          />
        </label>
        <input
          type="submit"
          className="h-12 w-20 text-xl rounded-lg bg-gray-600 shadow-xl text-blue-100 mt-4 focus:ring-1 ring-blue-100 ring-offset-2 ring-offset-bgc"
        />
      </form>
    </div>
  );
}
