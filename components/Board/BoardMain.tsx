import { Comment } from '@prisma/client';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo';
import BoardComments from './BoardComments';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

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

export default function ContactMain({ postData }: any) {
  const DAY = dayjs(postData.createdAt);
  return (
    <div className="m-5 ">
      <div className="rounded-lg w-full bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl p-4 whitespace-pre-wrap">
        <p className="text-base">{DAY.format('YYYY-MM-DD-ddd HH:mm:ss')}</p>
        <p>{postData && postData.title}</p>
      </div>
      <p className="rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl mt-2 p-4 whitespace-pre-wrap">
        {postData && postData.content}
      </p>
      <ul>{postData && postData.comments && <BoardComments postData={postData} />}</ul>
    </div>
  );
}
