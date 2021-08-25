import gql from 'graphql-tag';
import React from 'react';
import BoardComments from './BoardComments';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { Board, Comment } from '@prisma/client';
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
type Input = {
  postData: Board & Comments;
};
type Comments = {
  comments: Comment[];
};
export default function ContactMain({ postData }: Input) {
  const DAY = dayjs(postData.createdAt);
  console.log('ccc');
  return (
    <div className="m-5 ">
      <div className="rounded-lg w-full bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-2xl p-4 whitespace-pre-wrap">
        <p className="text-base">{DAY.format('YYYY-MM-DD-ddd HH:mm:ss')}</p>
        <p className="mt-2">{postData && postData.title}</p>
        <p className="rounded-lg bg-gray-900 shadow-comment focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc leading-8 text-xl py-2 px-2 mt-4">
          {postData && postData.content}
        </p>
      </div>
      <ul>{postData && postData.comments && <BoardComments postData={postData} />}</ul>
    </div>
  );
}
