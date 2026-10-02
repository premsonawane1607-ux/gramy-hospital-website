import { notFound } from "next/navigation";
import PageBannerArea from "@/components/inner/PageBannerArea";
import BlogArea from "@/components/blog/BlogArea";
import BlogCard from "@/components/blog/BlogCard";
import { blogCategories, blogPostHref, getBlogCategory, postsInCategory } from "@/lib/blog";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getBlogCategory(params.slug);
  return { title: category ? `${category.name} – Gramy Hospital` : "Gramy Hospital" };
}

// Live `/category/<slug>/` archive: same layout as the blog listing under a
// "Category: <name>" banner.
export default function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const category = getBlogCategory(params.slug);
  if (!category) notFound();
  return (
    <>
      <PageBannerArea
        title={
          <>
            Category: <span>{category.name}</span>
          </>
        }
        breadcrumb={`Category: ${category.name}`}
        image={null}
        info={["print", "mail"]}
      />
      <BlogArea>
        {postsInCategory(category.slug).map((post) => (
          <BlogCard
            key={post.slug}
            entry={{ title: post.title, href: blogPostHref(post), date: post.date, minsRead: post.minsRead, post }}
          />
        ))}
      </BlogArea>
    </>
  );
}
