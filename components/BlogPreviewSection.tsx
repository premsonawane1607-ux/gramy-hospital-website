import Link from "next/link";
import Image from "next/image";
import { blogPreview } from "@/lib/homepage-data";

// Matches the original `HospaPosts` widget (`.blog-area.pb-100 > .container`
// with a `.section-title` capped at max-width:555px, a 3-up `.blog-card`
// row, and a `.blog-bottom-text` pill below it). CSS values taken directly
// from hospa-main.css: tag-btn bg #C4DCF3, meta 12.5px with a "-" separator,
// h3 23.5px/1.4/mb-18px, blog-btn 14.5px/500 sliding its arrow on hover, and
// the bottom pill border-radius 40px / border #E1E6EB / padding 20px 50px.
export default function BlogPreviewSection() {
  return (
    <div className="pb-[50px] min-[768px]:pb-[100px]">
      <div className="container-default">
        <div className="mx-auto mb-10 max-w-[555px] text-center lg:mb-[40px]">
          <span className="mb-3 inline-block text-xs font-bold tracking-[1.2px] text-optional">
            {blogPreview.sub}
          </span>
          <h2 className="text-[28px] leading-[1.3] min-[1200px]:text-[42px]">
            Read Top Articles From <b className="font-extrabold">Expert Doctors</b>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[992px]:grid-cols-3">
          {blogPreview.posts.map((post) => (
            <div key={post.slug} className="mb-[25px]">
              <div className="relative">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[800/530] w-full overflow-hidden rounded-[20px]">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                </Link>
                <span className="absolute bottom-2 left-2 inline-block rounded-[20px] bg-[#C4DCF3] px-5 py-3 text-xs font-semibold tracking-[1.2px] text-black transition hover:bg-main hover:text-white">
                  {post.tag}
                </span>
              </div>
              <div className="pt-[25px]">
                <ul className="mb-[17px] flex leading-none">
                  <li className="relative mr-[35px] text-[12.5px] tracking-[1.2px] after:absolute after:-right-[22px] after:top-1/2 after:-translate-y-1/2 after:content-['-']">
                    {post.date}
                  </li>
                  <li className="text-[12.5px] tracking-[1.2px]">{post.readTime}</li>
                </ul>
                <h3 className="mb-[18px] text-[23.5px] leading-[1.4]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-optional">
                    {post.title}
                  </Link>
                </h3>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative inline-flex items-center pl-[22px] text-[14.5px] font-medium text-black transition-all hover:pl-0 hover:pr-2 hover:text-optional"
                >
                  <i
                    className="ti ti-arrow-right absolute left-0 top-1/2 -translate-y-1/2 text-base transition-all group-hover:left-full"
                    aria-hidden="true"
                  />
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {blogPreview.remainingCount > 0 && (
          <div className="mt-[15px] rounded-[40px] border border-[#E1E6EB] px-[50px] py-5 text-center">
            <p className="text-[15px]">
              {/* Original literally says "Articles" (plural) regardless of count —
                  preserved verbatim, not grammar-corrected. */}
              We have {blogPreview.remainingCount} more Articles.{" "}
              <Link href={blogPreview.viewAllHref} className="font-medium text-optional hover:text-main">
                View All <i className="ti ti-arrow-right ml-[5px]" aria-hidden="true" />
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
