import Link from "next/link";

export default function PageBanner({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-r from-main/10 to-optional/10 py-14">
      <div className="container-default flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <ul className="mt-2 flex justify-center gap-2 text-sm text-paragraph md:justify-start">
            <li>
              <Link href="/" className="hover:text-main">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>{title}</li>
          </ul>
        </div>
        <a href="tel:022-35347300" className="default-btn">
          CALL: +91 22-35347300
        </a>
      </div>
    </div>
  );
}
