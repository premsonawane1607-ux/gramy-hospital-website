import { notFound } from "next/navigation";
import PageBannerArea from "@/components/inner/PageBannerArea";
import BlogArea from "@/components/blog/BlogArea";
import BlogCard from "@/components/blog/BlogCard";
import { blogPostHref, blogTags, getBlogTag, postsWithTag } from "@/lib/blog";

export function generateStaticParams() {
  return blogTags.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tag = getBlogTag(params.slug);
  return { title: tag ? `${tag.name} – Gramy Hospital` : "Gramy Hospital" };
}

// Live `/tag/<slug>/` archive: same layout as the blog listing under a
// "Tag: <name>" banner.
export default function BlogTagPage({ params }: { params: { slug: string } }) {
  const tag = getBlogTag(params.slug);
  if (!tag) notFound();
  return (
    <>
      <PageBannerArea
        title={
          <>
            Tag: <span>{tag.name}</span>
          </>
        }
        breadcrumb={`Tag: ${tag.name}`}
        image={null}
        info={["print", "mail"]}
      />
      <BlogArea>
        {postsWithTag(tag.slug).map((post) => (
          <BlogCard
            key={post.slug}
            entry={{ title: post.title, href: blogPostHref(post), date: post.date, minsRead: post.minsRead, post }}
          />
        ))}
      </BlogArea>
    </>
  );
}
