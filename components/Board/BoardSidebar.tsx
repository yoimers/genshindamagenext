import { Board } from '@prisma/client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { AllPostsContext } from '../../pages/boards/[[...board]]';

function Loading() {
  return (
    <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1 text-textcolor">
      LOADING
    </aside>
  );
}
export default function BoardSidebar() {
  const allPosts = useContext(AllPostsContext);
  return (
    <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1 text-textcolor overflow-auto">
      <ul>
        <Link href={`/boards/`}>
          <a className="block pl-4 mx-1 mt-2 h-10 leading-10 rounded-lg bg-gray-900 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc text-lg">
            掲示板へ戻る
          </a>
        </Link>
        {allPosts &&
          allPosts.map((board: Board) => {
            return (
              <Link href={`/boards/${board.id}`} key={board.id}>
                <a className="block pl-4 mx-1 mt-2 h-10 leading-10 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc text-lg  overflow-hidden">
                  {board.title}
                </a>
              </Link>
            );
          })}
      </ul>
      {/* <div>
        {data.boards && data.boards.hasMore && (
          <button
            onClick={() => {
              fetchMore({
                variables: {
                  after: data.boards.cursor as number,
                },
                updateQuery: (
                  prev: any,
                  { fetchMoreResult, ...rest }: { fetchMoreResult: any }
                ) => {
                  if (!fetchMoreResult) return prev;
                  console.log(fetchMoreResult);
                  return {
                    ...fetchMoreResult,
                    boards: {
                      ...fetchMoreResult.boards,
                      boards: [...prev.boards.boards, ...fetchMoreResult.boards.boards],
                    },
                  };
                },
              });
            }}
          >
            Lead More
          </button>
        )}
      </div> */}
    </aside>
  );
}
