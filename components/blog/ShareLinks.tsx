"use client";

import { useEffect, useState, type MouseEvent } from "react";

// Live `.article-social .social`: Facebook, Twitter and LinkedIn share links
// for the article's own address. The live links are built by WordPress for
// the live URL; here they point at whatever address this page is served from.
export default function ShareLinks({ path, title }: { path: string; title: string }) {
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  const url = `${origin}${path}`;
  // WordPress `urlencode()`: spaces become "+".
  const text = encodeURIComponent(title).replace(/%20/g, "+");
  const popup = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(e.currentTarget.href, "facebook-share", "width=580,height=296");
  };

  return (
    <ul className="lv-social">
      <li>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          onClick={popup}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <i className="flaticon-facebook" />
        </a>
      </li>
      <li>
        <a
          href={`https://twitter.com/share?text=${text}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <i className="flaticon-twitter" />
        </a>
      </li>
      <li>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=&source=Gramy Hospital`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <i className="flaticon-linkedin" />
        </a>
      </li>
    </ul>
  );
}
