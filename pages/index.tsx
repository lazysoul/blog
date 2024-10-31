import Container from "../components/container";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { format, parseISO } from 'date-fns';
import { getAllPosts } from "../lib/getPost";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories?: string[];
};

export default function HomePage({
  posts = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>I value the beauty of taking things slowly in development.</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {posts.map((post: Post) => (
            <article key={post.slug} className="space-y-2">
              <Link
                href={`/posts/${post.slug}`}
                className="text-2xl font-bold hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              <div className="text-gray-400 text-sm">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    "slug",
    "title",
    "excerpt",
    "date",
    "categories"
  ]) || [];

  return {
    props: { posts },
  };
};