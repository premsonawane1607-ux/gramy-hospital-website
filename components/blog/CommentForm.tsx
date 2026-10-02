"use client";

// Live WordPress comment form (`#respond.comment-respond`): Comment, Name,
// Email, Website, the "save my details" checkbox and "Post a Comment". This is
// a static rebuild with no comment backend to post to, so submission is a
// no-op (after the browser's own required-field checks) rather than posting
// somewhere that would 404 — the same as the other live forms in this project.
export default function CommentForm() {
  return (
    <div id="respond" className="lv-comment-respond">
      <h3 id="reply-title" className="lv-comment-reply-title">
        Leave a Reply
      </h3>
      <form id="commentform" className="lv-comment-form" onSubmit={(e) => e.preventDefault()}>
        <p className="lv-comment-notes">
          <span id="email-notes">Your email address will not be published.</span>{" "}
          <span className="lv-required-field-message">
            Required fields are marked <span className="lv-required">*</span>
          </span>
        </p>
        <p className="lv-comment-form-comment">
          <label htmlFor="comment">
            Comment <span className="lv-required">*</span>
          </label>{" "}
          <textarea placeholder="Type Your Comments" id="comment" name="comment" cols={45} rows={8} maxLength={65525} required />
        </p>
        <p className="lv-comment-form-author">
          <label htmlFor="author">
            Name <span className="lv-required">*</span>
          </label>{" "}
          <input placeholder="Name" id="author" name="author" type="text" size={30} maxLength={245} autoComplete="name" required />
        </p>
        <p className="lv-comment-form-email">
          <label htmlFor="email">
            Email <span className="lv-required">*</span>
          </label>{" "}
          <input
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            size={30}
            maxLength={100}
            aria-describedby="email-notes"
            autoComplete="email"
            required
          />
        </p>
        <p className="lv-comment-form-url">
          <label htmlFor="url">Website</label>{" "}
          <input placeholder="Website" id="url" name="url" type="url" size={30} maxLength={200} autoComplete="url" />
        </p>
        <p className="lv-comment-form-cookies-consent">
          <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />{" "}
          <label htmlFor="wp-comment-cookies-consent">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </p>
        <p className="lv-form-submit">
          <input name="submit" type="submit" id="submit" className="lv-submit" value="Post a Comment" />
        </p>
      </form>
    </div>
  );
}
