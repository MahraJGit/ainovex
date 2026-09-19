import type { Post } from "../../lib/post";
import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="mt-16 text-center text-[15px] text-ink/60">
        Nothing here yet. Try another category or search term.
      </p>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          slug={post.slug}
          image={post.image}
          title={post.title}
          excerpt={post.excerpt}
          date={post.date}
          category={post.category}
          variant="light"
        />
      ))}
    </div>
  );
}