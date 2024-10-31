import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
import Container from "../../components/container";
import { getAllPosts, getAllCategories } from "../../lib/getPost";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories?: string[];
};

export default function PostsPage({
  posts = [],
  categories = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const currentCategory = router.query.category as string | undefined;

  const filteredPosts = currentCategory
    ? posts.filter(post => post.categories?.includes(currentCategory))
    : posts;

  return (
    <Container>
      <CategoryList categories={categories} currentCategory={currentCategory} />
      <h1 className="text-xl font-medium mb-6 text-gray-700">
        Posts {currentCategory ? `in ${currentCategory}` : ''}
      </h1>
      <PostList posts={filteredPosts} />
    </Container>
  );
}

function CategoryList({ categories = [], currentCategory }: { categories: string[], currentCategory?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-6 text-gray-700">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryLink href="/posts" isActive={!currentCategory}>All</CategoryLink>
        {categories?.map(category => (
          <CategoryLink 
            key={category} 
            href={`/posts?category=${category}`}
            isActive={currentCategory === category}
          >
            {category}
          </CategoryLink>
        ))}
      </div>
    </div>
  );
}

function CategoryLink({ href, isActive, children }: { href: string, isActive: boolean, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className={`px-3 py-1 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </Link>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return posts.length ? (
    <>
      {posts.map((post: Post) => (
        <article key={post.slug} className="mb-10">
          <Link
            href={`/posts/${post.slug}`}
            className="text-lg leading-6 font-bold"
          >
            {post.title}
          </Link>
          <p>{post.excerpt}</p>
          <div className="text-gray-400">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
        </article>
      ))}
    </>
  ) : (
    <p>No blog posts found.</p>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = getAllCategories() || [];
  const allPosts = getAllPosts(["slug", "title", "excerpt", "date", "categories"]) || [];

  return {
    props: { 
      posts: allPosts,
      categories
    },
  };
};
