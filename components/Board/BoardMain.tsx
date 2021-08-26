import gql from 'graphql-tag';
import React, { ReactElement } from 'react';
import BoardComments from './BoardComments';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { useQuery } from 'react-apollo';
import Image from 'next/image';
dayjs.locale(ja);

const GET_BOARD = gql`
  query Board($id: ID!) {
    board(id: $id) {
      id
      title
      content
      createdAt
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
function Loading(): ReactElement {
  return (
    <Image
      src={'/images/loadingklee.gif'}
      width={300}
      layout={'fill'}
      alt="Picture of the author"
    />
  );
}
export default function ContactMain({ boardId }: Input) {
  const { data, loading, error, refetch } = useQuery(GET_BOARD, { variables: { id: boardId } });
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  let DAY;
  if (data) {
    const d = new Date(Number(data.board.createdAt));
    DAY = dayjs(d);
  }
  return (
    <div className="m-5 ">
      <div className="rounded-lg w-full bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl p-4 whitespace-pre-wrap">
        <p className="text-base">{DAY.format('YYYY-MM-DD-ddd HH:mm:ss')}</p>
        <p className="mt-2">{data.board.title}</p>
        <p className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
          {data.board.content}
        </p>
      </div>

      <ul>
        {data && data.board && data.board.comments && (
          <BoardComments comments={data.board.comments} refetch={refetch} />
        )}
      </ul>
    </div>
  );
}
