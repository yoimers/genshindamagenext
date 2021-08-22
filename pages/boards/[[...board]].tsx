import React from 'react';
import Layout from '../../components/Layout';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';
import BoardMain from '../../components/Board/BoardMain';
import BoardSidebar from '../../components/Board/BoardSidebar';
import BoardHome from '../../components/Board/BoardHome';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

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

// ...上はクライアントオブジェクトをインスタンス化しているコードです。

export default function Contact() {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_BOARDLIST);
  const router = useRouter();
  let board = router.query.board;
  board = board && board[0];
  return (
    <Layout>
      <div className="flex flex-nowrap bg-transparent min-h-full">
        <main className="flex flex-col flex-grow  mr-2 border border-gray-800 rounded-lg shadow-sm p-1 w-mainwidth text-textcolor">
          {board ? <BoardMain boardId={board} /> : <BoardHome refetch={refetch} />}
        </main>
        <BoardSidebar data={data} loading={loading} error={error} fetchMore={fetchMore} />
      </div>
    </Layout>
  );
}
