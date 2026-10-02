import PageBannerArea from "@/components/inner/PageBannerArea";
import BlogArea from "@/components/blog/BlogArea";
import BlogCard from "@/components/blog/BlogCard";
import { blogPostHref, blogPosts } from "@/lib/blog";

export const metadata = { title: "Blog – Gramy Hospital" };

// Live `/blog/`: image-less banner, then every article as a full-width card
// beside the blog sidebar (the live listing has no pagination at 4 articles).
export default function BlogIndexPage() {
  return (
    <>
      <PageBannerArea title={<b>Blog</b>} breadcrumb="Blog" image={null} info={["print", "mail"]} />
      <BlogArea>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            entry={{ title: post.title, href: blogPostHref(post), date: post.date, minsRead: post.minsRead, post }}
          />
        ))}
      </BlogArea>
    </>
  );
}
