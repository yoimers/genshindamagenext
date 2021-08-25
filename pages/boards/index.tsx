import React from 'react';
import BoardHome from '../../components/Board/BoardHome';
import gql from 'graphql-tag';
import { prisma } from '../api/resolvers';
import LayoutBoards from '../../components/LayoutBoards';
import { Board, PrismaClient } from '@prisma/client';

const GET_BOARDLIST = gql`
  query boardlist($after: Int) {
    boards(after: $after) {
      cursor
      hasMore
      boards {
        id
        title
        content
      }
    }
  }
`;
type Input = {
  allPostsData: Board[];
};
export default function BoardIndex({ allPostsData }: Input) {
  return (
    <LayoutBoards allPostsData={allPostsData}>
      <BoardHome />
    </LayoutBoards>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const allPostsData = await prisma.board.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return {
    props: {
      allPostsData: JSON.parse(JSON.stringify(allPostsData)),
    },
    revalidate: 10,
  };
}
