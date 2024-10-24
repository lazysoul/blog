import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from '../../components/container';
import { getAllPosts } from '../../lib/getPost';
import { formatDate } from '../../lib/dateFormatter';

type Post = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
};

type Props = {
  posts: Post[];
  tag: string;
};

export default function TagPage({ posts, tag }: Props) {
  return (
    <Container>
      <Head>
        <title>{`Posts tagged with ${tag} | My awesome blog`}</title>
      </Head>
      <h1 className="text-4xl font-bold mb-8">Posts tagged with #{tag}</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-2xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500">{formatDate(post.date)}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags']);
  const posts = allPosts.filter((post) => {
    if (typeof post.tags === 'string') {
      return post.tags.split(', ').includes(tag);
    }
    return false;
  });

  return {
    props: {
      posts,
      tag,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['tags']);
  const tags = Array.from(new Set(posts.flatMap((post) => {
    if (typeof post.tags === 'string') {
      return post.tags.split(', ');
    }
    return [];
  })));

  return {
    paths: tags.map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
};
