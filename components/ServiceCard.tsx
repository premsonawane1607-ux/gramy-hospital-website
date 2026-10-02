import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="gh-service-card group flex flex-col gap-[15px] rounded-card bg-[#E1E6EB] p-5 pt-[25.7px] transition hover:bg-white sm:p-[30px] sm:pt-[40.7px]"
    >
      <Image src={icon} alt={title} width={56} height={56} className="mb-[15px] h-14 w-14 object-contain" />
      <h3 className="text-lg font-bold group-hover:text-optional">{title}</h3>
      <p className="text-paragraph">{description}</p>
      <span className="gh-feature-card__link mt-auto">
        <span aria-hidden="true">&#8594;</span> Read More
      </span>
    </Link>
  );
}
