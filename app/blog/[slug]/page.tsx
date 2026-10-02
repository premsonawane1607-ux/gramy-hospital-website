import { notFound } from "next/navigation";
import PageBannerArea from "@/components/inner/PageBannerArea";
import BlogArticle from "@/components/blog/BlogArticle";
import { blogPosts, getBlogPost } from "@/lib/blog";

// The live articles sit at the site root (`/<slug>/`); locally they keep the
// existing /blog/<slug> routes that the rest of the site already links to.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  return { title: post ? `${post.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  return (
    <>
      <PageBannerArea
        title={post.title}
        breadcrumb={[
          { text: "Blog", href: "/blog" },
          { text: post.title, href: null },
        ]}
        image={{ src: "/images/live/2024/04/bg23.jpg", width: 1728, height: 316 }}
        info={["print", "mail"]}
        callLabel={false}
      />
      <BlogArticle post={post} />
    </>
  );
}
