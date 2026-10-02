import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding text-center">
      <div className="container-default">
        <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
        <p className="mt-4 text-paragraph">The page you are looking for does not exist.</p>
        <Link href="/" className="default-btn mt-8 inline-flex">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
