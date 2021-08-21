import Link from 'next/link';
import React from 'react';
import LayoutDocuments from '../../components/LayoutDocuments';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';

export default function document({ postData, allPostsData }) {
  return (
    <LayoutDocuments allPostsData={allPostsData}>
      <p className="text-titlecolor text-3xl mb-2">{postData.title}</p>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </LayoutDocuments>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const allPostsData = getSortedPostsData();
  return {
    props: {
      postData,
      allPostsData,
    },
  };
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
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
    paths,
    fallback: false,
  };
}
