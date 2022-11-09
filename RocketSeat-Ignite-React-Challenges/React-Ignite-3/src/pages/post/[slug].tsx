import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import { Info } from '../../components/Info';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />

      <img alt="banner" className={styles.banner} src={post.data.banner.url} />

      <main className={styles.posts}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.data.title}</h1>

          <Info
            time={post.data.content}
            author={post.data.author}
            date={post.first_publication_date}
          />
        </header>

        {post.data.content.map(content => (
          <section className={styles.post} key={content.heading}>
            <h2 className={styles.heading}>{content.heading}</h2>

            {content.body.map(({ text }, index) =>
              text
                .split('\n')
                .filter(text => text !== '')
                .map(paragraph => (
                  // eslint-disable-next-line react/no-array-index-key
                  <p className={styles.paragraph} key={index}>
                    {paragraph}
                  </p>
                ))
            )}
          </section>
        ))}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post', { pageSize: 1 });
  const posts = postsResponse?.results;

  const paths = posts.map(post => ({
    params: { slug: post.uid },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', params?.slug as string);

  const post = response.data;

  const formattedPost = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,

    data: {
      title: post.title,
      author: post.author,
      subtitle: post.subtitle,
      banner: { url: post.banner.url },
      content: post.content,
    },
  };

  return { props: { post: formattedPost } };
};
