import { Comment } from '@prisma/client';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo';
import BoardComments from './BoardComments';

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
        username
        commentId
      }
    }
  }
`;
type Input = {
  boardId: string[] | string;
};
export default function ContactMain({ boardId }: Input) {
  const { data, loading, error, refetch } = useQuery(GET_BOARD, { variables: { id: boardId } });
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  return (
    <div className="m-5 ">
      <p className="rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl p-4">
        {data.board.title}
      </p>
      <p className="rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl mt-2 p-4">
        {data.board.content}
      </p>
      <ul>
        {data && data.board && data.board.comments && (
          <BoardComments comments={data.board.comments} refetch={refetch} />
        )}
      </ul>
    </div>
  );
}
