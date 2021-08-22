import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo';

const GET_BOARD = gql`
  query Board($id: ID!) {
    board(id: $id) {
      id
      title
      content
      comments {
        id
        content
        boardId
        childcomments {
          id
          content
        }
      }
    }
  }
`;
type Input = {
  boardId: string[] | string;
};
export default function ContactMain({ boardId }: Input) {
  const { data, loading, error } = useQuery(GET_BOARD, { variables: { id: boardId } });
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  return (
    <>
      <p>{data.board.title}</p>
      <p>{data.board.content}</p>
      <ul>
        {data &&
          data.board &&
          data.board.comments.map((comment) => {
            return <li key={comment.id}>{comment.content}</li>;
          })}
      </ul>
    </>
  );
}
