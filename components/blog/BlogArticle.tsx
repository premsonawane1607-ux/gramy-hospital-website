import Link from "next/link";
import "../about-blog-live.css";
import RichText from "@/components/RichText";
import { ElColumn, ElDocument, ElSection, ElWidget } from "@/components/live/Elementor";
import BlogSidebar from "./BlogSidebar";
import CommentForm from "./CommentForm";
import ShareLinks from "./ShareLinks";
import { adjacentPosts, blogPostHref, getBlogCategory, type BlogPost } from "@/lib/blog";

// Live `.article-pnext-post` item: the previous post shows its thumbnail on
// the left, the next post on the right.
function Neighbour({ post, side }: { post: BlogPost; side: "previous" | "next" }) {
  const href = blogPostHref(post);
  const image = (
    <div className="lv-image">
      <Link href={href} className="lv-thumb">
        <span className="lv-fullimage" role="img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={150} height={150} src={post.thumb} alt="" />
        </span>
      </Link>
    </div>
  );
  const info = (
    <div className="lv-info">
      <h4 className="lv-title lv-usmall">
        <Link href={href}>{post.title}</Link>
      </h4>
      <Link href={href} className="lv-blog-btn">
        <i className="ti ti-arrow-right" />
        {/* The live markup has a space after the icon on the previous post only. */}
        {side === "previous" && " "}
        Read More
      </Link>
    </div>
  );
  return (
    <div className={`lv-${side}-post`}>
      <Link href={href} className={`lv-${side}-title`}>
        {side === "previous" ? (
          <>
            <i className="ti ti-arrow-narrow-left" /> Previous Post
          </>
        ) : (
          <>
            Next Post
            <i className="ti ti-arrow-narrow-right" />
          </>
        )}
      </Link>
      <div className="lv-item">{side === "previous" ? [image, info] : [info, image]}</div>
    </div>
  );
}

// Live single-post template (`.blog-details-area`): featured image and meta,
// the article's Elementor text widget, share links, previous/next posts and
// the comment form, with the blog sidebar alongside.
export default function BlogArticle({ post }: { post: BlogPost }) {
  const category = getBlogCategory(post.category);
  const { previous, next } = adjacentPosts(post.slug);
  return (
    <div className="gh-lv">
      <div className="lv-blog-details-area lv-ptb-100">
        <div className="lv-container">
          <div className="lv-row">
            <div className="lv-col-lg-8 lv-col-md-12">
              <div className="lv-blog-details lv-blog-left-sidebar">
                <div className="lv-blog-details-meta">
                  <div className="lv-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} />
                  </div>
                  <ul className="lv-meta">
                    {category && (
                      <li>
                        <Link href={`/category/${category.slug}`} className="lv-tag-btn">
                          {category.name}
                        </Link>
                      </li>
                    )}
                    <li>{post.date}</li>
                    <li>{post.minsRead}</li>
                  </ul>
                </div>
                <div className="lv-blog-details-content">
                  <ElDocument id={post.elementorId}>
                    <ElSection id="1bfc5998" boxed>
                      <ElColumn id="22bb30d9" size={100}>
                        <ElWidget id="38eb02e0" type="text-editor">
                          <RichText nodes={post.nodes} />
                        </ElWidget>
                      </ElColumn>
                    </ElSection>
                  </ElDocument>
                  <div className="lv-article-social">
                    <span>SHARE THIS ARTICLE</span>
                    <ShareLinks path={blogPostHref(post)} title={post.title} />
                  </div>
                  <div className="lv-article-pnext-post">
                    <div className="lv-row lv-justify-content-center">
                      <div className="lv-col-lg-6 lv-col-md-6">
                        {previous ? <Neighbour post={previous} side="previous" /> : <div className="lv-previous-post" />}
                      </div>
                      <div className="lv-col-lg-6 lv-col-md-6">
                        {next ? <Neighbour post={next} side="next" /> : <div className="lv-next-post" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="comments" className="lv-comments-area">
                <CommentForm />
              </div>
            </div>
            <div className="lv-col-lg-4 lv-col-md-12">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
