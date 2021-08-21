import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import LayoutDocuments from '../../components/LayoutDocuments';
import { getPostData, getSortedPostsData } from '../../lib/posts';

export default function Document({ allPostsData, postData }) {
  return (
    <LayoutDocuments allPostsData={allPostsData}>
      {postData.title}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </LayoutDocuments>
  );
}

export async function getStaticProps() {
  const postData = await getPostData('introduction');
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      postData,
    },
  };
}
