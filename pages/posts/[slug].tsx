import type { InferGetStaticPropsType } from "next";
import { Post } from '../../interfaces';
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts, getPostBySlug } from "../../lib/getPost";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import Link from 'next/link';
import { useMemo } from 'react';


export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // useMemo를 사용하여 tags를 처리합니다.
  const tags = useMemo(() => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags === 'string') return post.tags.split(',').map(tag => tag.trim());
    return [];
  }, [post.tags]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} | Let's just have fun`}</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {post.excerpt ? (
                <p className="mt-2 text-xl">{post.excerpt}</p>
              ) : null}
              <time className="flex mt-2 text-gray-400">
                {distanceToNow(new Date(post.date))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

                        
            {/* Updated tags section */}
            {tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/tags/${tag}`}
                      className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-blue-200 transition-colors duration-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </article>

        </div>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post: Post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "excerpt",
    "date",
    "content",
    "tags",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
        tags: post.tags || [], // 태그가 없는 경우를 대비해 빈 배열 사용
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
