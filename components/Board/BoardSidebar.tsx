import { Board } from '@prisma/client';
import { ApolloError, ApolloQueryResult } from 'apollo-client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ErrorComp from './ErrorComp';

type Input = {
  data: any;
  loading: Boolean;
  error: ApolloError | undefined;
  fetchMore: any;
};

function Loading() {
  return (
    <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1 text-textcolor">
      <Image src={'/images/loadingklee.gif'} width={600} height={600} alt="Picture of the author" />
    </aside>
  );
}
export default function ContactSidebar({ data, loading, error, fetchMore }: Input) {
  if (loading) return <Loading />;
  if (error) {
    return <ErrorComp />;
  }

  return (
    <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1 text-textcolor overflow-auto">
      <ul>
        <Link href={`/boards/`}>
          <a className="block pl-4 mx-1 mt-2 h-10 leading-10 rounded-lg bg-gray-900 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc text-lg">
            掲示板へ戻る
          </a>
        </Link>
        {data &&
          data.boards &&
          data.boards.boards.map((board: Board) => {
            return (
              <Link href={`/boards/${board.id}`} key={board.id}>
                <a className="block pl-4 mx-1 mt-2 h-10 leading-10 rounded-lg bg-gray-700 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc text-lg  overflow-hidden">
                  {board.title}
                </a>
              </Link>
            );
          })}
      </ul>
      <div className="w-full pr-2">
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
            className="block w-full pl-4 mx-1 mt-2 h-10 leading-10 rounded-lg bg-gray-900 shadow-xl focus:ring-0 ring-blue-100 ring-offset-2 ring-offset-bgc text-lg text-left"
          >
            Lead More
          </button>
        )}
      </div>
    </aside>
  );
}