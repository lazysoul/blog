import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Comment from "../../components/comment";
import Container from "../../components/container";
import { getAllPosts, getPostBySlug } from "../../lib/getPost";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import Link from 'next/link';
import { formatDate } from '../../lib/dateFormatter';
import { Post } from '../../interfaces'; // Post 타입을 import

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{post.title || 'Untitled'} | My awesome blog</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <h1 className="text-4xl font-bold">{post.title || 'Untitled'}</h1>
            <p className="text-gray-500 mt-2">{formatDate(post.date)}</p>
            {post.excerpt && (
              <p className="mt-2 text-xl">{post.excerpt}</p>
            )}
            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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

          <Comment />
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
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "excerpt",
    "date",
    "content",
    "tags",
  ]);
  const content = await markdownToHtml(post.content || "");

  // tags 처리를 더 안전하게 수정
  let tags: string[] | undefined;
  if (typeof post.tags === 'string') {
    tags = post.tags.split(/\s+/).filter(Boolean);
  } else if (Array.isArray(post.tags)) {
    tags = post.tags.filter((tag): tag is string => typeof tag === 'string');
  }

  return {
    props: {
      post: {
        ...post,
        content,
        tags,
      } as Post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      if (!post.slug) {
        console.warn('Post without slug:', post);
        return null;
      }
      return {
        params: {
          slug: post.slug,
        },
      };
    }).filter((path): path is { params: { slug: string } } => path !== null),
    fallback: false,
  };
}
