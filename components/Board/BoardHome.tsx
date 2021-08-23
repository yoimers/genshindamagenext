import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { OperationVariables, useApolloClient, useMutation } from 'react-apollo';
import { brotliDecompress } from 'zlib';

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
  const onChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onClick = async (e) => {
    e.preventDefault();
    if (!body.title || !body.content) return;
    const {
      data: { createBoard: newboard },
    } = await createBoard({
      variables: {
        title: body.title,
        content: body.content,
      },
    });
    console.log(newboard);
    if (newboard.success) {
      setBody({ title: '', content: '' });
      refetch();
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title: 'API', content: 'api' };
      const x = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(x, 'aa');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <a href="/api/graphql">GraphQL Playground</a>
      <p>掲示板のホーム</p>
      <p>掲示板作成</p>
      <form onSubmit={onClick}>
        <input type="text" onChange={onChange} value={body.title} name="title" />
        <input type="text" onChange={onChange} value={body.content} name="content" />
        <input type="submit" />
      </form>
      <form onSubmit={submitData}>
        <input type="submit" />
      </form>
    </div>
  );
}
