import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import LayoutDocuments from '../../components/LayoutDocuments';
import { getSortedPostsData } from '../../lib/posts';

export default function Document({ allPostsData }) {
  return (
    <LayoutDocuments allPostsData={allPostsData}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </LayoutDocuments>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
