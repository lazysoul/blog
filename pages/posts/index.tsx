import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Container from "../../components/container";
import { format, parseISO } from 'date-fns';
import { getAllPosts, getPostsByCategory, getAllCategories } from "../../lib/getPost";
import { useRouter } from 'next/router';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories?: string[];
};

export default function PostsPage({
  posts,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const currentCategory = router.query.category as string | undefined;

  const filteredPosts = currentCategory
    ? posts.filter(post => post.categories?.includes(currentCategory))
    : posts;

  return (
    <Container>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/posts" className={`px-3 py-1 rounded ${!currentCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            All
          </Link>
          {categories.map(category => (
            <Link 
              key={category} 
              href={`/posts?category=${category}`}
              className={`px-3 py-1 rounded ${currentCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      <h1 className="text-3xl mb-8">Posts {currentCategory ? `in ${currentCategory}` : ''}</h1>
      {filteredPosts.length ? (
        filteredPosts.map((post: Post) => (
          <article key={post.slug} className="mb-10">
            <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className="text-lg leading-6 font-bold"
            >
              {post.title}
            </Link>
            <p>{post.excerpt}</p>
            <div className="text-gray-400">
              <time dateTime={post.date}>{format(parseISO(post.date), 'LLLL d, yyyy')}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = getAllCategories();
  const allPosts = getAllPosts(["slug", "title", "excerpt", "date", "categories"]);

  return {
    props: { 
      posts: allPosts,
      categories
    },
  };
};
