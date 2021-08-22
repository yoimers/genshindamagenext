import { ApolloError, ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { OperationVariables, useQuery } from 'react-apollo';

type Input = {
  data: any;
  loading: Boolean;
  error: ApolloError;
  fetchMore: any;
};
export default function ContactSidebar({ data, loading, error, fetchMore }: Input) {
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  return (
    <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1 text-textcolor">
      <ul>
        <Link href="/boards">
          <a className="block">掲示板へ戻る</a>
        </Link>
        {data &&
          data.boards &&
          data.boards.boards.map((board) => {
            return (
              <Link href={`/boards/${board.id}`} key={board.id}>
                <a className="block">{board.title}</a>
              </Link>
            );
          })}
      </ul>
      <div>
        {data.boards && data.boards.hasMore && (
          <button
            onClick={() => {
              fetchMore({
                variables: {
                  after: data.boards.cursor as number,
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
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
      </div>
    </aside>
  );
}
