import Button from "../../ui/Button";
import BlogCard from "../../ui/BlogCard";
import { posts } from "@/app/lib/post";

export default function LatestNews() {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="latest-news" className="relative overflow-hidden bg-[#05080F]">
      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        <div className="mx-auto flex flex-col items-center text-center">
          <h2 className="text-white">Latest News & Insights</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              image={post.image}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/blog" variant="primary">
            View all Blogs
          </Button>
        </div>
      </div>
    </section>
  );
}