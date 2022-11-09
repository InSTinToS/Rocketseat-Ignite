import Image from 'next/image';

import { useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';
import { Info } from '../components/Info';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatPosts = posts => {
  return posts.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      author: post.data.author,
      subtitle: post.data?.subtitle,
    },
  }));
};

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination);

  return (
    <main id="home" className={styles.home}>
      <header className={styles.header}>
        <Image src="/Logo.svg" height={25} width={240} alt="logo" />
      </header>

      <ul>
        {posts.results.map(post => (
          <li key={post.uid} className={styles.post}>
            <span className={styles.title}>
              <Link href={`/post/${post.uid}`}>{post.data.title}</Link>
            </span>

            <span className={styles.subtitle}>{post.data.subtitle}</span>

            <Info
              date={post.first_publication_date}
              author={post.data.author}
            />
          </li>
        ))}
      </ul>

      {posts.next_page && (
        <button
          type="button"
          className={styles.more}
          onClick={async () => {
            const res = await fetch(posts.next_page);
            const newPageData = await res.json();

            if (newPageData)
              setPosts(prev => ({
                next_page: newPageData.next_page,
                results: [...prev.results, ...formatPosts(newPageData.results)],
              }));
          }}
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
}

export const getStaticProps = async ({ req }) => {
  const prismic = getPrismicClient({ req });
  const postsResponse = await prismic.getByType('post', { pageSize: 1 });
  const posts = postsResponse?.results;

  const results = formatPosts(posts);

  return {
    props: { postsPagination: { results, next_page: postsResponse.next_page } },
  };
};
