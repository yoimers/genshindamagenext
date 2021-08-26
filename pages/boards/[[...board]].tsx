import { PrismaClient } from '@prisma/client';
import React, { createContext } from 'react';
import gql from 'graphql-tag';
import BoardMain from '../../components/Board/BoardMain';
import LayoutBoards from '../../components/LayoutBoards';
import { Board, Comment } from '@prisma/client';
import { useRouter } from 'next/router';
import BoardHome from '../../components/Board/BoardHome';
import { GetStaticPaths, GetStaticProps } from 'next';

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

type Boards = (Board & Comments)[];
type Input = {
  allPostsData: Boards;
  postData: Board & Comments;
};
type Comments = {
  comments: Comment[];
};

export const AllPostsContext = createContext([] as Boards);
export default function BoardBody({ postData, allPostsData }: Input) {
  const {
    query: { board },
  } = useRouter();
  const boardId = board ? Number(board[0]) : 0; //0がhome それ以外が掲示板のId
  return (
    <AllPostsContext.Provider value={allPostsData}>
      <LayoutBoards>
        {boardId === 0 ? (
          <BoardHome />
        ) : (
          <BoardMain postData={postData} />
        )}
      </LayoutBoards>
    </AllPostsContext.Provider>
  );
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const prisma = new PrismaClient();
//   const allPostsData = await prisma.board.findMany({
//     orderBy: [
//       {
//         createdAt: 'desc',
//       },
//     ],
//     include: {
//       comments: {
//         include: {
//           childcomments: true,
//         },
//       },
//     },
//   });
//   const postData =
//     allPostsData.filter((post) => {
//       const paramId = params && params.board && params.board[0];
//       return Number(paramId) === post.id;
//     })[0] || null;
//   const boardId = params ? null : params.board;

//   return {
//     props: {
//       boardId,
//       postData: JSON.parse(JSON.stringify(postData)),
//       allPostsData: JSON.parse(JSON.stringify(allPostsData)),
//     },
//     // revalidate: 10,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const prisma = new PrismaClient();
//   const boards = await prisma.board.findMany({
//     select: {
//       id: true,
//     },
//   });
//   const paths = boards.map((board) => {
//     return { params: { board: [board.id.toString()] } };
//   });
//   paths.push({ params: { board: ['0'] } });
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };
