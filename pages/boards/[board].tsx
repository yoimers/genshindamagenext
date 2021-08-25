import { PrismaClient } from '@prisma/client';
import React from 'react';
import gql from 'graphql-tag';
import BoardMain from '../../components/Board/BoardMain';
import LayoutBoards from '../../components/LayoutBoards';
import { Board, Comment } from '@prisma/client';

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
  postData: Board & Comments;
};
type Comments = {
  comments: Comment[];
};

export default function BoardBody({ postData, allPostsData }: Input) {
  return (
    <LayoutBoards allPostsData={allPostsData}>
      <BoardMain postData={postData} />
    </LayoutBoards>
  );
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const allPostsData = await prisma.board.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      comments: {
        include: {
          childcomments: true,
        },
      },
    },
  });
  const postData = allPostsData.filter((post) => Number(params.board) === post.id)[0];

  return {
    props: {
      boardId: params.board,
      postData: JSON.parse(JSON.stringify(postData)),
      allPostsData: JSON.parse(JSON.stringify(allPostsData)),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // const boards = await prisma.board.findMany({
  //   select: {
  //     id: true,
  //   },
  // });
  // const paths = boards.map((board) => {
  //   return { params: { board: board.id.toString() } };
  // });

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return {
    paths: [],
    fallback: 'blocking',
  };
}
